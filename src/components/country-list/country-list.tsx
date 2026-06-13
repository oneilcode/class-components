import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';

import styles from './country-list.module.css';
import { memo, useMemo, useCallback } from 'react';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

const CARD_HEIGHT = 300;

export const CountryList = memo(
  ({
    countries,
    searchQuery,
    selectedColumns,
    selectedRegion,
    selectedYear,
    sortField,
    sortOrder,
  }: CountryListProps) => {
    const filteredCountries = useMemo(() => {
      return countries
        .filter((c) => {
          const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
          return matchesSearch && matchesRegion;
        })
        .sort((a, b) => {
          if (sortField === 'name') {
            return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
          } else {
            const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;
            const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;
            return sortOrder === 'asc' ? popA - popB : popB - popA;
          }
        });
    }, [countries, searchQuery, selectedRegion, sortField, sortOrder, selectedYear]);

    const rowRenderer = useCallback(
      ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
        const country = filteredCountries[index];

        if (!country) {
          return null;
        }

        return (
          <div key={key} style={style}>
            <CountryCard
              country={country}
              selectedYear={selectedYear}
              selectedColumns={selectedColumns}
            />
          </div>
        );
      },
      [filteredCountries, selectedYear, selectedColumns]
    );

    if (filteredCountries.length === 0) {
      return (
        <div className={styles.countryList}>
          <div style={{ textAlign: 'center', padding: '40px' }}>Страны не найдены</div>
        </div>
      );
    }

    return (
      <div className={styles.countryList}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={filteredCountries.length}
              rowHeight={CARD_HEIGHT}
              rowRenderer={rowRenderer}
              overscanRowCount={3}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>
      </div>
    );
  }
);
