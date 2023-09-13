import { useSelector } from 'react-redux';
import { AppState } from '../../../store/configureStore';
import { GameGetDto } from '../../../types/games';

export function BuildDeck(): React.ReactElement {
    const $appliedFilters = useSelector(
        (state: AppState) => state.deckBuilder.appliedFilters
    );

    const handleTogglingFilter = (option: GameGetDto) => {
        console.log(option);
    };

    const handleSelectAll = (filterOptions: GameGetDto[]) => {
        console.log(filterOptions);
    };

    const handleRemoveFilter = (filter: GameGetDto) => {
        console.log(filter);
    };

    return <div>Build Deck</div>;
}
