export function useLoading() {
  const isLoading = ref(false);

  const withLoading = async <T>(
    action: () => Promise<T>,
    delay: number = 500
  ): Promise<T> => {
    isLoading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return await action();
    } catch (error) {
      console.error("Ett fel uppstod:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    withLoading,
  };
}
