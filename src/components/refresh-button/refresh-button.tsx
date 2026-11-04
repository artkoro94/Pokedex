import { useQueryClient } from '@tanstack/react-query';

interface RefreshButtonProps {
  label?: string;
}

export const RefreshButton = ({ label = 'Refresh' }: RefreshButtonProps) => {
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['pokemons'],
    });

    await queryClient.invalidateQueries({
      queryKey: ['pokemon-details'],
    });
  };

  return (
    <button
      className="button button--secondary"
      type="button"
      onClick={handleRefresh}
    >
      <span aria-hidden="true">↻</span>
      {label}
    </button>
  );
};
