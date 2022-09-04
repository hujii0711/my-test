import * as React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, useSafeArea} from 'react-native-safe-area-context';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Appbar,
  TouchableRipple,
  Switch,
  Text,
  Drawer as DrawerPaper,
  List,
  useTheme,
  Divider,
} from 'react-native-paper';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ExampleList({navigation}) {
  const data = [
    {
      id: 'animatedFab',
      title: 'AnimatedFABExample',
    },
    {
      id: 'activityIndicator',
      title: 'ActivityIndicatorExample',
    },
    {
      id: 'appbar',
      title: 'AppbarExample',
    },
  ];

  const {colors} = useTheme();
  const safeArea = useSafeArea();

  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: colors.background,
        paddingBottom: safeArea.bottom,
        paddingLeft: safeArea.left,
        paddingRight: safeArea.right,
      }}
      data={data}
      style={{
        backgroundColor: colors.background,
      }}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={Divider}
      renderItem={({item}) => (
        <List.Item
          title={item.title}
          onPress={() => navigation.navigate(item.id)}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}

const DrawerItems = () => {
  return (
    <DrawerContentScrollView>
      <DrawerPaper.Section title="Preferences">
        <TouchableRipple onPress={() => {}}>
          <View>
            <Text variant="labelLarge">Dark Theme</Text>
            <View pointerEvents="none">
              <Switch value={false} />
            </View>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View>
            <Text variant="labelLarge">RTL</Text>
            <View pointerEvents="none">
              <Switch value={false} />
            </View>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View>
            <Text variant="labelLarge">Switch back to Material 2</Text>
            <View pointerEvents="none">
              <Switch value={false} />
            </View>
          </View>
        </TouchableRipple>
      </DrawerPaper.Section>
    </DrawerContentScrollView>
  );
};

function StackNB() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          header: ({navigation, route, options, back}) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <Appbar.Header elevated>
                {back ? (
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                ) : openDrawer ? (
                  <Appbar.Action
                    icon="menu"
                    isLeading
                    onPress={() => openDrawer()}
                  />
                ) : null}
                <Appbar.Content title={title} />
              </Appbar.Header>
            );
          },
        };
      }}>
      <Stack.Screen
        name="ExampleList"
        component={ExampleList}
        options={{title: 'Examples'}}
      />
    </Stack.Navigator>
  );
}

const Index = () => {
  return (
    <SafeAreaProvider>
      <React.Fragment>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={() => <DrawerItems />}>
            <Drawer.Screen
              name="Home"
              component={StackNB}
              options={{headerShown: false}}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </React.Fragment>
    </SafeAreaProvider>
  );
};

export default Index;
