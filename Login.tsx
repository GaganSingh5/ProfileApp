import React from 'react';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { Alert, Button, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
const auth0ClientId = "zqIUFaxacCGoZtxbzT61noUhOtg89yeN";
const authorizationEndpoint = "https://dev-dfcs7pnp.us.auth0.com";


const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function Login() {

    const [name, setName] = React.useState(null);

    const discovery = AuthSession.useAutoDiscovery("https://dev-dfcs7pnp.us.auth0.com");
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
      { 
        redirectUri,
        clientId: auth0ClientId,
        // id_token will return a JWT token
        responseType: 'id_token',
        // retrieve the user's profile
        scopes: ['openid', 'profile'],
        extraParams: {
          // ideally, this will be a random value
          nonce: 'nonce',
        },
      },
      discovery
    );
    
    
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.

    console.log(`Redirect URL: ${redirectUri}`);
  
    React.useEffect(() => {
        console.log("Frfrl,fle");
        console.log(result);
        
      if (result) {
        if (result.type === 'error') {
            console.log("errorfcec");
            
          Alert.alert(
            'Authentication error',
            result.params.error_description || 'something went wrong'
          );
          return;
        }
        if (result.type === 'success') {
            console.log("Dssfdfce");
            
          // Retrieve the JWT token and decode it
          const jwtToken = result.params.id_token;
          const decoded = jwtDecode(jwtToken);
  
        //   const { name } = decoded;
        console.log(decoded);
        
          setName(name);
        }
      }
    }, [result]);


    // return (
    //   <View style={styles.container}>
    //     <Button           
    //             title="Log in with Auth0"
    //             onPress={handleLogin}
    //     ></Button>
    //   </View>
    // );
    return (
        <View style={styles.container}>
          {name ? (
            <>
              <Text >You are logged in, {name}!</Text>
              <Button title="Log out" onPress={() => setName(null)} />
            </>
          ) : (
            <Button
              disabled={!request}
              title="Log in with Auth0"
              onPress={() => promptAsync({ useProxy })}
            />
          )}
        </View>
      );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
      marginTop:'10px'
  }
});



function handleLogin() {
    console.log("Helleo");
    
}

