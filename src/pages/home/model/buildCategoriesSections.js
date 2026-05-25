export function buildCategoriesSections(sections, categories) {
  return sections.map(section => {
    const parent = categories.find(c => c.slug === section.slug);
    if (!parent) {
      return {
        title: section.title,
        items: []
      }
    }
    const items = section.categories.map(slug => {
      const category = categories.find(c => c.slug === slug && c.parent_id === parent.id)

      if (!category) return null

      return {
        ...category, parentSlug: parent.slug
      }
    }).filter(Boolean)
    
    return {
      title: section.title,
      items: items
    }
  })
}