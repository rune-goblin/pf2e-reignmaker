/**
 * Remove Kingdom Data Macro
 * 
 * This macro completely removes all kingdom data from the party actor,
 * leaving no trace of ReignMaker data. Use this for a complete cleanup.
 * 
 * WARNING: This will permanently delete all kingdom data!
 * Make sure you have a backup if you need to restore anything.
 */
(async () => {
  console.log('🗑️ Removing all kingdom data...');
  
  // Find the party actor
  const party = game.actors.find(a => a.type === 'party');
  if (!party) {
    ui.notifications.error('No party actor found!');
    return;
  }
  
  console.log(`Found party actor: ${party.name}`);
  
  // Check if kingdom data exists
  const kingdomData = party.getFlag('pf2e-reignmaker', 'kingdom-data');
  const territoryData = party.getFlag('pf2e-reignmaker', 'territory-data');
  const gameProgressionData = party.getFlag('pf2e-reignmaker', 'game-progression-data');
  const turnStateData = party.getFlag('pf2e-reignmaker', 'turn-state');
  const eventVotes = party.getFlag('pf2e-reignmaker', 'eventVotes');
  const backupData = party.getFlag('pf2e-reignmaker', 'kingdom-data-backup');

  if (!kingdomData && !territoryData && !gameProgressionData && !turnStateData && !eventVotes && !backupData) {
    ui.notifications.info('No kingdom data found on party actor.');
    console.log('ℹ️ No kingdom data to remove');
    return;
  }
  
  // Log what we're about to delete
  console.log('📊 Current kingdom data:');
  if (kingdomData) {
    console.log('  - kingdom-data:', {
      turn: kingdomData.currentTurn,
      phase: kingdomData.currentPhase,
      settlements: kingdomData.settlements?.length || 0,
      hexes: kingdomData.hexes?.length || 0,
      resources: kingdomData.resources
    });
  }
  if (territoryData) console.log('  - territory-data: exists');
  if (gameProgressionData) console.log('  - game-progression-data: exists');
  if (turnStateData) console.log('  - turn-state: exists');
  if (eventVotes) console.log('  - eventVotes: exists');
  if (backupData) console.log('  - kingdom-data-backup: exists');

  // Confirm deletion with user
  const confirmed = await Dialog.confirm({
    title: "Remove All Kingdom Data",
    content: `<p><strong>WARNING:</strong> This will permanently delete all kingdom data from the party actor:</p>
      <ul>
        ${kingdomData ? '<li>Kingdom data (turn, phase, resources, settlements, etc.)</li>' : ''}
        ${territoryData ? '<li>Territory data</li>' : ''}
        ${gameProgressionData ? '<li>Game progression data</li>' : ''}
        ${turnStateData ? '<li>Turn state data</li>' : ''}
        ${eventVotes ? '<li>Event votes data</li>' : ''}
        ${backupData ? '<li>Migration backup data</li>' : ''}
      </ul>
      <p>This action cannot be undone. Are you sure?</p>`,
    defaultYes: false
  });
  
  if (!confirmed) {
    ui.notifications.info('Kingdom data removal cancelled.');
    console.log('❌ User cancelled removal');
    return;
  }
  
  // Remove all ReignMaker flags
  const flagsRemoved = [];
  
  if (kingdomData) {
    await party.unsetFlag('pf2e-reignmaker', 'kingdom-data');
    flagsRemoved.push('kingdom-data');
    console.log('✅ Removed kingdom-data flag');
  }
  
  if (territoryData) {
    await party.unsetFlag('pf2e-reignmaker', 'territory-data');
    flagsRemoved.push('territory-data');
    console.log('✅ Removed territory-data flag');
  }
  
  if (gameProgressionData) {
    await party.unsetFlag('pf2e-reignmaker', 'game-progression-data');
    flagsRemoved.push('game-progression-data');
    console.log('✅ Removed game-progression-data flag');
  }

  if (turnStateData) {
    await party.unsetFlag('pf2e-reignmaker', 'turn-state');
    flagsRemoved.push('turn-state');
    console.log('✅ Removed turn-state flag');
  }

  if (eventVotes) {
    await party.unsetFlag('pf2e-reignmaker', 'eventVotes');
    flagsRemoved.push('eventVotes');
    console.log('✅ Removed eventVotes flag');
  }

  if (backupData) {
    await party.unsetFlag('pf2e-reignmaker', 'kingdom-data-backup');
    flagsRemoved.push('kingdom-data-backup');
    console.log('✅ Removed kingdom-data-backup flag');
  }

  // Verify removal
  const verification = {
    'kingdom-data': party.getFlag('pf2e-reignmaker', 'kingdom-data'),
    'territory-data': party.getFlag('pf2e-reignmaker', 'territory-data'),
    'game-progression-data': party.getFlag('pf2e-reignmaker', 'game-progression-data'),
    'turn-state': party.getFlag('pf2e-reignmaker', 'turn-state'),
    'eventVotes': party.getFlag('pf2e-reignmaker', 'eventVotes'),
    'kingdom-data-backup': party.getFlag('pf2e-reignmaker', 'kingdom-data-backup')
  };
  
  const allRemoved = Object.values(verification).every(v => v === undefined);
  
  if (allRemoved) {
    ui.notifications.info(`Successfully removed all kingdom data! (${flagsRemoved.join(', ')})`);
    console.log('✅ All kingdom data removed successfully');
    console.log('💡 Reload your world to ensure all systems reflect the changes.');
  } else {
    ui.notifications.error('Some data may not have been removed. Check console for details.');
    console.error('❌ Verification failed:', verification);
  }
})();
