import { Button, Checkbox, Text } from '@mantine/core';
import { Games } from '../../../constants/fakeData/inventoryData';
import './renderFilterOptions.css';
import {
    CustomButton,
    TCGButton,
    TestButton,
} from '../../mantineComponentsStyling/TCGButton';

interface RenderFilterOptionsProps {
    filterName: string;
    filterOptions: Games[];
}

export function RenderFilterOptions({
    filterName,
    filterOptions,
}: RenderFilterOptionsProps) {
    const handleTextClick = () => {
        console.log('filter clicked');
    };

    return (
        <div className="renderFilterOptionsContainer">
            <Text className="filterNameText"> {filterName} </Text>

            <div className="filterOptionsCheckboxContainer">
                {filterOptions.map((option) => (
                    <Checkbox key={option.id} label={option.name} />
                ))}
            </div>

            <TestButton />
            <CustomButton />
            <TCGButton />
            <Text onClick={handleTextClick}> Show More. . .</Text>
        </div>
    );
}
