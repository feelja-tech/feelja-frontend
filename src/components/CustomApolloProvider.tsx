/* eslint-disable no-nested-ternary */
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { useRouter } from "next/router";
import { Socket as PhoenixSocket } from "phoenix";
import React, { ReactElement, useEffect, useState } from "react";
import { apiDomain, apiUrl } from "../helpers/environment";
import { MainContentContainer } from "./Containers";
import SvgLoading from "./svg/SvgLoading";

function apolloLink(router) {
  return ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if ([401, 403].includes((networkError as any)?.statusCode)) {
        router.push("/signup/welcome");
      } else {
        console.error(graphQLErrors, networkError);

        const stringError = [
          networkError && networkError.toString(),
          graphQLErrors && graphQLErrors.toString(),
        ];

        router.push(`/error?error=${stringError.toString()}`);
      }
    }),
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);

        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      createAbsintheSocketLink(
        AbsintheSocket.create(
          new PhoenixSocket(`wss://${apiDomain}/socket`, {
            params: () => {
              return {
                jwt: Object.fromEntries(
                  document.cookie.split("; ").map((x) => x.split(/=(.*)$/, 2))
                ).feelja_user,
              };
            },
          })
        )
      ),
      createHttpLink({
        uri: `${apiUrl}/graphql`,
        credentials: "include",
      })
    ),
  ]);
}

export function CustomApolloProvider(props: {
  children?: ReactElement;
}): ReactElement {
  const { children } = props;
  const [client, setClient] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      setClient(
        new ApolloClient({
          link: apolloLink(router),
          cache: new InMemoryCache(),
        })
      );
    }
  }, [typeof window]);

  return client ? (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  ) : (
    <MainContentContainer>
      <SvgLoading style={{ transform: "scale(2)" }} />
    </MainContentContainer>
  );
}

export default CustomApolloProvider;
