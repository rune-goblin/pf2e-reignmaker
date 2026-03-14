import { x as get_store_value, a1 as BuildProjectManager, l as logger, y as kingdomData, a2 as partyActor, a3 as getCurrentTurnNumber } from "./GameCommandUtils-D_sgs3NK.js";
class BuildQueueService {
  /**
   * Get all projects in the build queue
   * Returns projects with normalized cost data (plain objects, not Maps)
   */
  getAllProjects() {
    const kingdom = get_store_value(kingdomData);
    const projects = kingdom?.buildQueue || [];
    return projects.map((p) => ({
      ...p,
      totalCost: p.totalCost instanceof Map ? Object.fromEntries(p.totalCost) : p.totalCost,
      remainingCost: p.remainingCost instanceof Map ? Object.fromEntries(p.remainingCost) : p.remainingCost,
      invested: p.invested instanceof Map ? Object.fromEntries(p.invested) : p.invested,
      pendingAllocation: p.pendingAllocation instanceof Map ? Object.fromEntries(p.pendingAllocation) : p.pendingAllocation
    }));
  }
  /**
   * Get all projects for a specific settlement
   */
  getSettlementProjects(settlementName) {
    return this.getAllProjects().filter(
      (project) => project.settlementName === settlementName
    );
  }
  /**
   * Get a specific project by ID
   */
  getProject(projectId) {
    return this.getAllProjects().find((p) => p.id === projectId);
  }
  /**
   * Check if a structure is already queued for a settlement
   */
  isStructureQueued(structureId, settlementName) {
    return this.getAllProjects().some(
      (p) => p.structureId === structureId && p.settlementName === settlementName
    );
  }
  /**
   * Create a new project with proper Map→object conversion for storage
   */
  createProject(structureId, structureName, tier, category, cost, settlementName) {
    const project = BuildProjectManager.createProject(
      structureId,
      structureName,
      tier,
      category,
      cost,
      settlementName
    );
    const converted = {
      ...project,
      totalCost: Object.fromEntries(project.totalCost),
      remainingCost: Object.fromEntries(project.remainingCost),
      invested: Object.fromEntries(project.invested),
      pendingAllocation: Object.fromEntries(project.pendingAllocation)
    };
    return converted;
  }
  /**
   * Add a new project to the queue
   */
  async addProject(project) {
    const actor = get_store_value(partyActor);
    if (!actor) throw new Error("Kingdom actor not available");
    await actor.updateKingdomData((k) => {
      if (!k.buildQueue) k.buildQueue = [];
      k.buildQueue.push(project);
    });
  }
  /**
   * Update a project in the queue
   */
  async updateProject(projectId, updates) {
    const actor = get_store_value(partyActor);
    if (!actor) throw new Error("Kingdom actor not available");
    await actor.updateKingdomData((k) => {
      if (!k.buildQueue) return;
      const project = k.buildQueue.find((p) => p.id === projectId);
      if (project) {
        Object.assign(project, updates);
      } else {
        logger.warn(`⚠️ [BuildQueueService] Project not found: ${projectId}`);
      }
    });
  }
  /**
   * Remove a project from the queue
   */
  async removeProject(projectId) {
    const actor = get_store_value(partyActor);
    if (!actor) throw new Error("Kingdom actor not available");
    await actor.updateKingdomData((k) => {
      if (!k.buildQueue) return;
      const initialLength = k.buildQueue.length;
      k.buildQueue = k.buildQueue.filter((p) => p.id !== projectId);
      if (k.buildQueue.length < initialLength) ;
      else {
        logger.warn(`⚠️ [BuildQueueService] Project not found: ${projectId}`);
      }
    });
  }
  /**
   * Clear all projects from the queue
   */
  async clearQueue() {
    const actor = get_store_value(partyActor);
    if (!actor) throw new Error("Kingdom actor not available");
    await actor.updateKingdomData((k) => {
      k.buildQueue = [];
    });
  }
  /**
   * Allocate resources to a project
   * Returns true if allocation was successful
   */
  async allocateResources(projectId, resource, amount) {
    const project = this.getProject(projectId);
    if (!project) {
      logger.warn(`⚠️ [BuildQueueService] Project not found: ${projectId}`);
      return false;
    }
    const allocated = BuildProjectManager.allocateResources(project, resource, amount);
    if (allocated > 0) {
      await this.updateProject(projectId, {
        pendingAllocation: project.pendingAllocation
      });
      return true;
    }
    logger.warn(`⚠️ [BuildQueueService] Could not allocate ${resource}`);
    return false;
  }
  /**
   * Apply pending allocations to a project
   */
  async applyPendingAllocations(projectId) {
    const project = this.getProject(projectId);
    if (!project) {
      logger.warn(`⚠️ [BuildQueueService] Project not found: ${projectId}`);
      return;
    }
    BuildProjectManager.applyPendingAllocation(project);
    await this.updateProject(projectId, {
      invested: project.invested,
      remainingCost: project.remainingCost,
      pendingAllocation: project.pendingAllocation,
      progress: project.progress
    });
  }
  /**
   * Process partial payment for a project
   * Pays what's affordable, updates remainingCost, persists to KingdomActor
   */
  async processPartialPayment(projectId, availableResources) {
    const actor = get_store_value(partyActor);
    if (!actor) {
      logger.error("❌ [BuildQueueService] No KingdomActor available");
      return { paid: {}, isComplete: false };
    }
    const paid = {};
    let isComplete = false;
    await actor.updateKingdomData((k) => {
      const project = k.buildQueue.find((p) => p.id === projectId);
      if (!project) {
        logger.warn(`⚠️ [BuildQueueService] Project not found: ${projectId}`);
        return;
      }
      const remainingEntries = Object.entries(project.remainingCost || {});
      for (const [resource, needed] of remainingEntries) {
        const available = availableResources[resource] || 0;
        const toPay = Math.min(available, needed);
        if (toPay > 0) {
          paid[resource] = toPay;
          const currentRemaining = project.remainingCost[resource] || 0;
          const newRemaining = currentRemaining - toPay;
          if (newRemaining <= 0) {
            delete project.remainingCost[resource];
          } else {
            project.remainingCost[resource] = newRemaining;
          }
        }
      }
      isComplete = Object.keys(project.remainingCost || {}).length === 0;
    });
    return { paid, isComplete };
  }
  /**
   * Complete a project - add structure to settlement or place fortification on hex
   * Branches on projectType: 'fortification' calls fortifyHexExecution, default adds structure
   */
  async completeProject(projectId) {
    const actor = get_store_value(partyActor);
    if (!actor) {
      logger.error("❌ [BuildQueueService] No KingdomActor available");
      return;
    }
    const kingdom = get_store_value(kingdomData);
    const project = (kingdom?.buildQueue || []).find((p) => p.id === projectId);
    if (!project) {
      logger.warn(`⚠️ [BuildQueueService] Project not found: ${projectId}`);
      return;
    }
    await actor.updateKingdomData((k) => {
      const p = k.buildQueue.find((p2) => p2.id === projectId);
      if (p) {
        p.isCompleted = true;
        p.completedTurn = getCurrentTurnNumber();
      }
    });
    if (project.projectType === "repair") {
      const { settlementStructureManagement } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cM);
      const { StructureCondition } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cu);
      const settlementId = project.settlementId || (() => {
        const freshKingdom = actor.getKingdomData();
        return freshKingdom?.settlements?.find((s) => s.name === project.settlementName)?.id;
      })();
      if (settlementId) {
        await settlementStructureManagement.updateStructureCondition(
          project.structureId,
          settlementId,
          StructureCondition.GOOD
        );
      }
    } else if (project.projectType === "fortification" && project.hexId) {
      const { fortifyHexExecution } = await import("./fortifyHex-BB0kE9Wk.js");
      await fortifyHexExecution(project.hexId, project.tier);
    } else {
      const freshKingdom = actor.getKingdomData();
      const settlement = freshKingdom?.settlements?.find((s) => s.name === project.settlementName);
      if (settlement) {
        const { settlementService } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cK);
        await settlementService.addStructure(settlement.id, project.structureId);
      }
    }
  }
}
const buildQueueService = new BuildQueueService();
export {
  BuildProjectManager,
  BuildQueueService,
  buildQueueService
};
