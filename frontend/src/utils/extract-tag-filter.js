export function extractTagFilters(sessions) {
    const fieldSet = new Set();
    const topicSet = new Set();
    const typeSet = new Set();
    const levelSet = new Set();
  
    sessions.forEach((session) => {
      const { field, topic, type, level } = session.tags || {};
      if (field) fieldSet.add(field);
      if (topic) topicSet.add(topic);
      if (type) typeSet.add(type);
      if (level) levelSet.add(level);
    });
  
    return {
      fields: Array.from(fieldSet),
      topics: Array.from(topicSet),
      types: Array.from(typeSet),
      levels: Array.from(levelSet),
    };
  }
  