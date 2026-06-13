# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: 4.6 s
- **Render duration**: 551.7 ms
- **Screenshot**: ![screenshot](/src/screenshots/baseline/sort-countries.png)

### Interaction B: Search countries

- **Commit duration**: 3.1 s
- **Render duration**: 241.3 ms
- **Screenshot**: ![screenshot](/src/screenshots/baseline/search-countries.png)

### Interaction C: Change year

- **Commit duration**: 2.9 s
- **Render duration**: 648 ms
- **Screenshot**: ![screenshot](/src/screenshots/baseline/change-year.png)

### Interaction D: Toggle column

- **Commit duration**: 1.9 s
- **Render duration**: 638.5 ms
- **Screenshot**: ![screenshot](/src/screenshots/baseline/toggle-column.png)

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: 1.9 s
- **Render duration**: 47.1 ms
- **Screenshot**: ![screenshot](/src/screenshots/baseline/sort-countries-opt.png)

### Interaction B: Search countries

- **Commit duration**: 1.7 s
- **Render duration**: 34.5 ms
- **Screenshot**: ![screenshot](/src/screenshots/baseline/search-countries-opt.png)

### Interaction C: Change year

- **Commit duration**: 1.8 s
- **Render duration**: 51.5 ms
- **Screenshot**: ![screenshot](/src/screenshots/baseline/change-year-opt.png)

### Interaction D: Toggle column

- **Commit duration**: 1 s
- **Render duration**: 35.9 ms
- **Screenshot**: ![screenshot](/src/screenshots/baseline/toggle-column-opt.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 551.7         | 47.1           | 91.5%       |
| Search countries | 241.3         | 34.5           | 85.7%       |
| Change year      | 648.0         | 51.5           | 92.1%       |
| Toggle column    | 638.5         | 35.9           | 94.4%       |
| **Average**      | **519.9**     | **42.3**       | **91.9%**   |
