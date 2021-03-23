import React from 'react';
import {api} from './service';
import {
    Header,
    Container,
    Segment
} from 'semantic-ui-react';
import StateItem from './StateItem';
import ItemCrator from './ItemCreator';

const App = () => {
    const tImportant = api.createTag("important");

    const sgBasic = api.createStateGroup("basic");
    const sDone = api.createState(sgBasic, "done");
    const sReady = api.createState(sgBasic, "ready");
    api.setStateAsDefault(sReady);
    api.createStateEdge(sDone, sReady);
    api.createStateEdge(sReady, sDone);

    const iHello = api.createItem("Hello", sgBasic);
    api.addTagToItem(iHello, tImportant);

    const iDoSmth = api.createItem("Do something", sgBasic);
    api.setItemState(iDoSmth, sDone);

    const iLive = api.createItem("Live", sgBasic);
    api.addTagToItem(iLive, tImportant);

    const sgWithWait = api.createStateGroup("real");
    const sRDone = api.createState(sgWithWait, "done");
    const sRReady = api.createState(sgWithWait, "ready");
    const sRWaiting = api.createState(sgWithWait, "waiting");
    api.setStateAsDefault(sRReady);
    api.createStateEdge(sRDone, sRReady);
    api.createStateEdge(sRDone, sRWaiting);
    api.createStateEdge(sRReady, sRDone);
    api.createStateEdge(sRReady, sRWaiting);
    api.createStateEdge(sRWaiting, sRDone);
    api.createStateEdge(sRWaiting, sRReady);

    const iRealistic = api.createItem("Realistic", sgWithWait);
        
    return (
        <Container>
            <Header as='h1' content='Point Squered' textAlign='center' />
            <Segment vertical textAlign='center'><ItemCrator /></Segment>
            {Object.values(api.getItems()).map(one => <Segment vertical><StateItem item={one} /></Segment>)}
        </Container>
    );
}

export default App;