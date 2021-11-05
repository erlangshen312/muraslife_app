export const handleRoute = async (navigation, name, item) => {
  navigation.navigate(name, { item });
};
