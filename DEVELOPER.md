# Google Tag Manager

## Custom events

@ngrx/router-store uses `routershapshot` (in /utils) to get data for router actions. To include data for analytics, add the data
to the serialize function using the store, such as this example with a property to determine if the user is logged in or not:

```
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let loggedIn = false;
    this.store$.select(fromAuth.getLoggedIn).subscribe((isLoggedIn) => {
      loggedIn = isLoggedIn;
    });

    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    return { url, queryParams, data: { isLoggedIn: loggedIn } };
  }
```

We're using `redux/beacon` to sync ngrx actions to analytics events. The mapping is done in `core/reducers/analytics.ts`.
To read more about redux/beacon, see the official documentation: https://rangle.github.io/redux-beacon/docs/quick-start/ngrx-users.html

## Example custom event

```
export function pageView(action: RouterNavigationAction<RouterStateSnapshot>): KnabPageView /* PageView */ {
  // Custom value included in routersnapshot
  const loggedIn = action.payload.event.state['data'].isLoggedIn || false;

  return {
    hitType: 'pageview',
    page: action.payload.routerState.url,
    loggedIn_Verzekeren: loggedIn ? 'y' : 'n'
  };
}
```

## Testing

Use the `Tag Assistant` extension for Chrome to test the events locally: https://chrome.google.com/webstore/detail/tag-assistant-by-google/kejbdjndbnbjgmefkgdddjlbokphdefk


# Feature Toggles

npm package: `@knx/feature-toggle`

## Usage

Put a toggle in `set-env.ts` (will be outputted in environment.ts):

```
featureToggles: {
 enableBuyFlowEmail: true
}
```

Use in a template:
```
<knx-feature-toggle [featureName]="'enableBuyFlowEmail'">
  <knx-form-group *ngIf="!profile"
    [options]="form.formConfig.email"
    [formControlName]="form.formConfig.email.formControlName">
  </knx-form-group>
</knx-feature-toggle>
```

# A/B testing

To support A/B testing it's probably useful to add support for queryParams in routes in the `@knx/feature-toggle` package. This way
you can show/hide features based on a URL.

Another option is to have two deployments of the web app (two S3 buckets) and route incoming traffic accordingly to one or the other
based on origin/cookie/etc.

If using Cloudfront the distribution can be handled by a Lambda@Edge. An example of A/B testing on request level can be found in the
AWS documentation: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html#lambda-examples-a-b-testing