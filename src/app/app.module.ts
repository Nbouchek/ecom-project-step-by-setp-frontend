import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { HttpClientModule } from "@angular/common/http";
import { ProductService } from "./services/product.service";
import { Router, RouterModule, Routes } from "@angular/router";
import { ProductCategoryMenuComponent } from "./components/product-category-menu/product-category-menu.component";
import { SearchComponent } from "./components/search/search.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CartStatusComponent } from "./components/cart-status/cart-status.component";
import { CartDetailsComponent } from "./components/cart-details/cart-details.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { LoginComponent } from "./components/login/login.component";
import { LoginStatusComponent } from "./components/login-status/login-status.component";
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
} from "@okta/okta-angular";
import myAppConfig from "./config/my-app-config";

const oktaConfig = Object.assign(
  {
    onAuthRequired: (injector) => {
      const router = injector.get(Router);

      // redirect the user to your custom login page
      router.navigate(["/login"]);
    },
  },
  myAppConfig.oidc
);

const routes: Routes = [
  { path: "login/callback", component: OktaCallbackComponent },
  { path: "login", component: LoginComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "cart-details", component: CartDetailsComponent },
  { path: "products/:id", component: ProductDetailsComponent },
  { path: "products/:id", component: ProductDetailsComponent },
  { path: "search/:keyword", component: ProductListComponent },
  { path: "category/:id/:name", component: ProductListComponent },
  { path: "category", component: ProductListComponent },
  { path: "products", component: ProductListComponent },
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "**", redirectTo: "/products", pathMatch: "full" },
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
