import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { GraphqlService, User } from '@app/core/graphql/graphql.service';
import { first, map } from 'rxjs/operators';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedUser: User;

  constructor(
    private graphqlService: GraphqlService,
    private credentialsService: CredentialsService
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const graphqlReply = <Observable<Credentials>>(
      this.graphqlService.login('nevlud3@gmail.com', 'manzes').pipe(
        map(
          user =>
            <Credentials>{ username: user.email, token: user.currentToken }
        ),
        first()
      )
    );

    graphqlReply.subscribe(credentials => {
      this.credentialsService.setCredentials(credentials, context.remember);
    });

    return graphqlReply;
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
