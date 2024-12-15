import { ref } from "vue";
import type { Event } from "~/types";

export function useSearch() {
  const events = ref<Event[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const fetchSearchData = async () => {
    loading.value = true;
    try {
      const response = await fetch("http://localhost:3001/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      events.value = await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e : new Error("Unknown error");
      console.error("Error fetching search data:", e);
    } finally {
      loading.value = false;
    }
  };

  return {
    events,
    loading,
    error,
    fetchSearchData,
  };
}
