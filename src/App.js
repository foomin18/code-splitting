import React, { Component, Suspense, startTransition} from 'react';


import Page1 from './Components/Page1';
//- No Code Splitting
//import Page2 from './Components/Page2';
//import Page3 from './Components/Page3';
//- AsyncComponent Code Splitting
//import AsyncComponent from './AsyncComponent';
//- React.lazy
const Page2Lazy = React.lazy(() => import('./Components/Page2'));
const Page3Lazy = React.lazy(() => import('./Components/Page3'));

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'page1',
      //- Code Splitting - manual
      component: null
    };
  }
  onRouteChange = (route) => {
    //- No Code Splitting
    //- AsyncComponent Code Splitting
    // this.setState({ route: route });

    // if (route === 'page1') {
    //   this.setState({ route: route })
    // } else if (route === 'page2') {
    //   //ここでrouteに応じて必要なコンポネントをインストール
    //   //初めにロードするbundle.jsには入っていない
    //   import('./Components/Page2') //only new js syntax
    //     .then((Page2) => {
    //       console.log(Page2);
    //       this.setState({ route: route, component: Page2.default });
    //     })
    //     .catch(err => {
    //     });
    // } else {
    //   import('./Components/Page3')
    //     .then((Page3) => {
    //       this.setState({ route: route, component: Page3.default });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }

    //- React.Lazy
    startTransition(() => {  //glimmer防止
      this.setState({ route: route });
    });
    
  }
  
  render() {
    //- No Code Splitting
    // if (this.state.route === 'page1') {
    //   return <Page1 onRouteChange={this.onRouteChange} />
    // } else if (this.state.route === 'page2') {
    //   return <Page2 onRouteChange={this.onRouteChange} />
    // } else {
    //   return <Page3 onRouteChange={this.onRouteChange} />
    // }

    //- Code Splitting - manual
    // if (this.state.route === 'page1') {
    //   return <Page1 onRouteChange={this.onRouteChange} />
    // } else {
    //   return <this.state.component onRouteChange={this.onRouteChange} />
    // }

    //- AsyncComponent Code Splitting
    // if (this.state.route === 'page1') {
    //   return <Page1 onRouteChange={this.onRouteChange} />
    // } else if (this.state.route === 'page2') {
    //   const AsyncPage2 = AsyncComponent(() => import("./Components/Page2"));
    //   return <AsyncPage2 onRouteChange={this.onRouteChange} />
    // } else {
    //   const AsyncPage3 = AsyncComponent(() => import("./Components/Page3"));
    //   return <AsyncPage3 onRouteChange={this.onRouteChange} />
    // }

    //- React.Lazy
    if (this.state.route === 'page1') {
      return <Page1 onRouteChange={this.onRouteChange} />
    } else if (this.state.route === 'page2') {
      return (
        <Suspense fallback={<div>Loading...</div>}> 
        {/*fallbackはロード中に表示されるコンポネントが入る */}
          <Page2Lazy onRouteChange={this.onRouteChange} />
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Page3Lazy onRouteChange={this.onRouteChange} />
        </Suspense>
      );
    }
  }
}

export default App;