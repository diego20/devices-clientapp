import { FilterSortCriteria, SortCriteria } from '../../util/types';
import styles from './filterSortComponent.module.css';

const FilterSortComponent = ({ possibleDeviceTypes, PossibleSortCriteria, selectedFilter, setSelectedFilter, selectedSortCriteria, setSelectedSortCriteria }: { possibleDeviceTypes: FilterSortCriteria, PossibleSortCriteria: SortCriteria, selectedFilter: any, setSelectedFilter: any, selectedSortCriteria: any, setSelectedSortCriteria: any }) => {

  return (
    <form className={styles.filterSortBox}>
      <div>
        <label className={styles.label}>Device Type</label>
        <select className={styles["select-styles"]} value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
          <option key={"null"} value={""}>All</option>
          {Object.keys(possibleDeviceTypes).map(keyObj => (
            <option key={keyObj} value={keyObj}>{possibleDeviceTypes[keyObj]}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={styles.label}>Sort by</label>
        <select className={styles["select-styles"]} value={selectedSortCriteria} onChange={(e) => setSelectedSortCriteria(e.target.value)}>
          {(Object.keys(PossibleSortCriteria) as Array<keyof SortCriteria>).map((objKey) => (
            <option key={PossibleSortCriteria[objKey].dataKey} value={PossibleSortCriteria[objKey].dataKey}>{PossibleSortCriteria[objKey].labelName}</option>
          ))}
        </select>
      </div>
    </form>
  )
}

export default FilterSortComponent;
