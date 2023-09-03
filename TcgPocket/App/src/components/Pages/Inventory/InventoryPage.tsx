import { FilterSelector } from '../../filterSelector/FilterSelector';
import './inventoryPage.css';

export function InventoryPage(): React.ReactElement {
    return (
        <div className="inventoryPageContainer">
            {/* Side Menu */}
            <div>
                <div className="uploadContainer">Upload Component</div>
                <div>
                    <FilterSelector />
                </div>
            </div>
            {/* Main Image View */}
            <div>Uploaded Card Container</div>
        </div>
    );
}
