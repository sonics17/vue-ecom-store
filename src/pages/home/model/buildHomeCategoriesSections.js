export function buildHomeCategoriesSections(sections, categories) {
  return sections.map(section => {
    const parent = categories.find(category => category.slug === section.slug);
    if (!parent) {
      return {
        title: section.title,
        items: [],
      };
    }

    const subCategories = section.categories
      .map(slug => {
        const category = categories.find(
          category =>
            category.slug === slug && category.parent_id === parent.id,
        );

        if (!category) return null;

        return {
          id: category.id,
          name: category.name,
          slug: category.slug,
          imageUrl: category.image_url,
          parentSlug: parent.slug,
        };
      })
      .filter(Boolean);

    return {
      title: section.title,
      items: subCategories,
      slug: section.slug,
    };
  });
}
