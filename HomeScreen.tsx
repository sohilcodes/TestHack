import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import MatrixBackground from '../components/MatrixBackground';
import ResultsTable, { Result } from '../components/ResultsTable';

export default function HomeScreen() {
  const [countdown, setCountdown] = useState(59);
  const [currentPeriod, setCurrentPeriod] = useState('');
  const [history, setHistory] = useState<Result[]>([]);
  const [allResults, setAllResults] = useState<Result[]>([]);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 59));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 59) {
      generateNewResult();
    }
  }, [countdown]);

  const generateNewResult = () => {
    const now = new Date();
    const period = now.toISOString().slice(0, 10).replace(/-/g, '') + '1000' + 
      String(10001 + now.getUTCHours() * 60 + now.getUTCMinutes());
    
    const number = Math.floor(Math.random() * 10);
    const pattern = number <= 4 ? 'SMALL' : 'BIG';
    const result = `${pattern} (${number})`;

    setCurrentPeriod(period);
    
    const newResult = { period, result, pattern };
    setHistory(prev => [newResult, ...prev].slice(0, 5));
    setAllResults(prev => [newResult, ...prev]);
    
    setLevel(prev => pattern === 'BIG' ? 0 : Math.min(prev + 1, 2));
  };

  return (
    <SafeAreaView style={styles.container}>
      <MatrixBackground />
      
      <View style={styles.header}>
        <MaterialIcons name="security" size={24} color="#FF4500" />
        <Text style={styles.headerText}>HACK BY SOHIL KHAN😎</Text>
        <MaterialIcons name="security" size={24} color="#FF4500" />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.periodText}>PERIOD: {currentPeriod}</Text>
        <Text style={styles.timerText}>
          Countdown: 00:{countdown.toString().padStart(2, '0')}
        </Text>
        <Text style={styles.levelText}>LEVEL: {level}</Text>
      </View>      <ResultsTable results={history} title="Recent History" />
      <ResultsTable results={allResults} title="All Results" />

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.telegramButton}
          onPress={() => Linking.openURL('https://t.me/+bVehiQxEiDxkZDZl')}
        >
          <FontAwesome name="telegram" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Join Telegram</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => Linking.openURL('https://btwwin.me/#/register?invitationCode=65832330505')}
        >
          <MaterialIcons name="app-registration" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  telegramButton: {
    backgroundColor: '#0088cc',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    marginRight: 5,
    justifyContent: 'center',
  },
  registerButton: {
    backgroundColor: '#FF4500',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    gap: 10,
  },
  headerText: {
    color: '#FF4500',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: 'rgba(0, 17, 0, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00FF00',
  },
  periodText: {
    color: '#00FF00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerText: {
    color: '#FF4500',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  levelText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});