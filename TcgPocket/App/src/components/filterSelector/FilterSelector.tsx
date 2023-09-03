import { useSelector } from 'react-redux';
import { AppState } from '../../store/configureStore';
import { RenderFilterOptions } from './modules/RenderFilterOptions';

export function FilterSelector(): React.ReactElement {
    const $games = useSelector((state: AppState) => state.data.games);
    const $cardTypes = useSelector((state: AppState) => state.data.cardTypes);
    const $sets = useSelector((state: AppState) => state.data.sets);
    const $rarities = useSelector((state: AppState) => state.data.rarities);

    return (
        <div className="filterSelectorContainer">
            <RenderFilterOptions filterName="Game" filterOptions={$games} />
            <RenderFilterOptions
                filterName="Card Type"
                filterOptions={$cardTypes}
            />
            <RenderFilterOptions filterName="Set" filterOptions={$sets} />
            <RenderFilterOptions
                filterName="Rarity"
                filterOptions={$rarities}
            />
        </div>
    );
}
