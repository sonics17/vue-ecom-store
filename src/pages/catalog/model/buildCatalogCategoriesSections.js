export function buildCatalogCategoriesSections(allCategories, rootCategories) {
  return rootCategories.map(rootCategory => {
    const subCategories = allCategories
      .filter(category => category.parent_id === rootCategory.id)
      .map(subCategory => {
        return {
          id: subCategory.id,
          name: subCategory.name,
          slug: subCategory.slug,
          imageUrl: subCategory.image_url,
          parentSlug: rootCategory.slug,
        }
      })

    return {
      title: rootCategory.name,
      items: subCategories,
      rootSlug: rootCategory.slug,
    }
  })
}
