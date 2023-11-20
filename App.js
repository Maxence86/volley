import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store';
import HomeScreen from './screens/HomeScreen';
import FormationScreen from './screens/FormationScreen';
import SummaryScreen from './screens/SummaryScreen';
import AddParticipantsScreen from './screens/AddParticipantsScreen';
import AuthScreen from './screens/AuthScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [role, setRole] = useState(null);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {role === 'admin' ? (
            <>
              <Stack.Screen name="Accueil" component={HomeScreen} />
              <Stack.Screen name="Formation" component={FormationScreen} />
              <Stack.Screen name="Résumé" component={SummaryScreen} />
              <Stack.Screen
                name="Ajouter Participants"
                component={AddParticipantsScreen}
              />
            </>
          ) : role === 'player' ? (
            <>
              <Stack.Screen name="Accueil" component={HomeScreen} />
              <Stack.Screen name="Formation" component={FormationScreen} />
            </>
          ) : (
            <Stack.Screen name="Auth">
              {(props) => <AuthScreen {...props} setRole={setRole} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Provider } from 'react-redux';
// import store from './store'; // Assure-toi que le chemin est correct
// import HomeScreen from './screens/HomeScreen';
// import FormationScreen from './screens/FormationScreen';
// import SummaryScreen from './screens/SummaryScreen';
// import AddParticipantsScreen from './screens/AddParticipantsScreen';

// const Stack = createNativeStackNavigator();



// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Accueil" component={HomeScreen} />
//           <Stack.Screen name="Formation" component={FormationScreen} />
//           <Stack.Screen name="Résumé" component={SummaryScreen} />
//           <Stack.Screen name="Ajouter Participants" component={AddParticipantsScreen} />

          
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Provider } from 'react-redux';
// import store from './store'; // Assure-toi que le chemin est correct
// import HomeScreen from './screens/HomeScreen';
// import FormationScreen from './screens/FormationScreen';
// import SummaryScreen from './screens/SummaryScreen';
// import AddParticipantsScreen from './screens/AddParticipantsScreen';

// const Stack = createNativeStackNavigator();



// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Accueil" component={HomeScreen} />
//           <Stack.Screen name="Formation" component={FormationScreen} />
//           <Stack.Screen name="Résumé" component={SummaryScreen} />
//           <Stack.Screen name="Ajouter Participants" component={AddParticipantsScreen} />

          
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }