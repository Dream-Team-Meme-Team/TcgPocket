import { useMemo } from 'react';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { useEffectOnce } from 'react-use';
import { getAllSets } from '../../../../services/dataServices/SetServices';
import { responseWrapper } from '../../../../services/responseWrapper';

export function SetTab(): React.ReactElement {
  const sets = useAppSelector((state) => state.data.sets);
  const searchTerm = useAppSelector((state) => state.data.searchTerm);
  const selectedId = useAppSelector((state) => state.data.selectedId);

  const renderedSets = useMemo(() => {
    return sets.filter((set) =>
      set.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sets, searchTerm]);

  const loadSets = async () => {
    const { payload } = await dispatch(getAllSets());
    responseWrapper(payload);
  };

  useEffectOnce(() => {
    loadSets();
  });

  return (
    <div>
      <div>
        {renderedSets.map((set, index) => {
          return (
            <div key={index}>
              <div> {set.name} </div>

              <div> Buttons </div>

              <div>{selectedId === set.id && <div> edit modal </div>}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
