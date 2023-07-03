import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CrossPuzzle = () => {
  const crosswordSize = 5;
  const [grid, setGrid] = useState(createEmptyGrid());
  const [selectedCell, setSelectedCell] = useState(null);

  // Function to create an empty grid
  function createEmptyGrid() {
    const emptyGrid = [];
    for (let i = 0; i < crosswordSize; i++) {
      emptyGrid.push(Array(crosswordSize).fill(''));
    }
    return emptyGrid;
  }

  // Function to handle input change for a cell
  function handleInputChange(row, col, text) {
    const updatedGrid = [...grid];
    updatedGrid[row][col] = text;
    setGrid(updatedGrid);
  }

  // Function to handle cell selection
  function handleCellSelection(row, col) {
    setSelectedCell({ row, col });
  }

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {[...Array(crosswordSize)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {[...Array(crosswordSize)].map((_, colIndex) => {
              const isHighlighted = selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex;
              return (
                <View
                  key={colIndex}
                  style={[styles.cellContainer, isHighlighted && styles.highlightedCell]}
                >
                  <TextInput
                    style={styles.cellText}
                    value={grid[rowIndex][colIndex]}
                    maxLength={1}
                    onChangeText={(text) => handleInputChange(rowIndex, colIndex, text)}
                    onFocus={() => handleCellSelection(rowIndex, colIndex)}
                  />
                </View>
              );
            })}
          </View>
        ))}
      </View>
      <View style={styles.clueContainer}>
        <Text style={styles.clueHeaderText}>Across:</Text>
        <Text style={styles.clueText}>1. Manipulation technique used to deceive individuals or organizations (8 letters)</Text>
        <Text style={styles.clueText}>3. Gathering information about a target through publicly available sources (12 letters)</Text>
        <Text style={styles.clueText}>5. The act of impersonating someone to gain unauthorized access (9 letters)</Text>
        <Text style={styles.clueHeaderText}>Down:</Text>
        <Text style={styles.clueText}>1. Technique involving the use of fear or urgency to manipulate individuals (11 letters)</Text>
        <Text style={styles.clueText}>2. The act of tricking someone into revealing sensitive information (9 letters)</Text>
        <Text style={styles.clueText}>4. Persuasive technique used to establish trust and credibility (7 letters)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  cellContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightedCell: {
    backgroundColor: 'yellow',
  },
  cellText: {
    fontSize: 20,
  },
  clueContainer: {
    flex: 0.5,
    backgroundColor: 'lightgray',
    padding: 10,
  },
  clueHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clueText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CrossPuzzle;
