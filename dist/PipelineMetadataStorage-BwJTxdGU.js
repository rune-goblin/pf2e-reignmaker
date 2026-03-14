class PipelineMetadataStorage {
  storage = /* @__PURE__ */ new Map();
  /**
   * Store metadata after pre-roll interactions
   * 
   * @param actionId - Action ID
   * @param playerId - Player ID (for multi-player support)
   * @param metadata - Metadata collected from pre-roll interactions
   */
  store(actionId, playerId, metadata) {
    const key = `${actionId}:${playerId}`;
    this.storage.set(key, metadata);
    console.log(`📦 [PipelineMetadataStorage] Stored metadata for ${key}:`, metadata);
  }
  /**
   * Retrieve metadata when creating check instance
   * 
   * @param actionId - Action ID
   * @param playerId - Player ID
   * @returns Metadata or null if not found
   */
  retrieve(actionId, playerId) {
    const key = `${actionId}:${playerId}`;
    const metadata = this.storage.get(key);
    if (metadata) {
      console.log(`📦 [PipelineMetadataStorage] Retrieved metadata for ${key}:`, metadata);
    } else {
      console.log(`📦 [PipelineMetadataStorage] No metadata found for ${key}`);
    }
    return metadata || null;
  }
  /**
   * Clear metadata after successful execution
   * 
   * @param actionId - Action ID
   * @param playerId - Player ID
   */
  clear(actionId, playerId) {
    const key = `${actionId}:${playerId}`;
    const deleted = this.storage.delete(key);
    if (deleted) {
      console.log(`📦 [PipelineMetadataStorage] Cleared metadata for ${key}`);
    }
  }
  /**
   * Clear all metadata (cleanup)
   */
  clearAll() {
    const count = this.storage.size;
    this.storage.clear();
    console.log(`📦 [PipelineMetadataStorage] Cleared all metadata (${count} entries)`);
  }
}
const pipelineMetadataStorage = new PipelineMetadataStorage();
export {
  pipelineMetadataStorage
};
