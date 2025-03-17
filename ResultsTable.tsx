import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export type Result = {
  period: string;
  result: string;
  pattern?: string;
};

interface ResultsTableProps {
  results: Result[];
  title: string;
}

export default function ResultsTable({ results, title }: ResultsTableProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.tableContainer}>
        {results.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.periodText}>PERIOD: {item.period}</Text>
            <Text style={[
              styles.resultText,
              { color: item.result.includes('SMALL') ? '#7CFC00' : '#FF0000' }
            ]}>
              RESULT: {item.result}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#00FF00',
    backgroundColor: 'rgba(0, 17, 0, 0.8)',
    borderRadius: 8,
  },
  title: {
    color: '#00FF00',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#00FF00',
  },
  tableContainer: {
    maxHeight: 200,
  },
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#00FF00',
  },
  periodText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  resultText: {
    marginTop: 5,
    fontWeight: 'bold',
  },
});