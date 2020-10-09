import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider, makeVar } from "@apollo/client"
import { KeyOfStringInterface } from "../constants";
import { BarchartState } from "./barChartInput/reducer";
import { LineChartState } from "./lineChartInput/reducer";
import { PieChartState } from "./pieChartInput/reducer";
import { InitBarChartState, InitLineChartState, InitPieChartState } from "./initState";
import { BrowserRouter } from "react-router-dom"
import Layout from "./layout"
import { createUploadLink } from "apollo-upload-client"


export type ChartType =
    | "Bar chart"
    | "Pie chart"
    | "Line chart"
    | "Area chart"
    | "Scatter chart"

export type localStateKey =
    | "chartDrawMutexReleased"
    | "chartType"
    | "barChartState"
    | "lineChartState"
    | "pieChartState"
    | "areaChartState"
    | "scatterChartState"
    | "isSignedIn"

export interface LocalState extends KeyOfStringInterface {
    chartType: ChartType;
    chartDrawMutexReleased: boolean;
    barChartState: BarchartState;
    lineChartState: LineChartState;
    pieChartState: PieChartState;
    areaChartState: any;
    scatterChartState: any;
    isSignedIn: boolean;
}

// local state
export const localState = makeVar<LocalState>({
    chartType: "Bar chart",
    chartDrawMutexReleased: true,
    barChartState: InitBarChartState,
    lineChartState: InitLineChartState,
    pieChartState: InitPieChartState,
    areaChartState: null,
    scatterChartState: null,
    isSignedIn: true
})

const apolloUploadLink = createUploadLink({
    uri: "https://localhost:4000/graphql",
    // credentials: "include"
})

const client = new ApolloClient({
    link: apolloUploadLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {}
            }
        }
    }),
    credentials: "include"
})

function App() {

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
