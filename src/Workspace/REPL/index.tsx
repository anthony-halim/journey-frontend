import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AceEditor from "react-ace";

import { Store } from "../../reducers/Store";
import EvalButton from "./EvalButton";
import Markdown from "./../../utils/Markdown";

import "ace-builds/src-noconflict/mode-javascript"; // replace with mode source in the future
import "ace-builds/src-noconflict/theme-tomorrow";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "5px 10px",
    margin: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Repl2() {
  const { globalState } = useContext(Store);
  const [code, setCode] = React.useState("");
  function onChangeMethod(newCode: string) {
    setCode(newCode);
  }
  const classes = useStyles();

  const runComponent = (
    <Card className={classes.root}>
      <CardContent>
        {
          globalState.replComponents.filter(
            (component: React.ReactNode) => component !== <div></div>
          )[0]
        }
      </CardContent>
    </Card>
  );

  const componentList = (
    <div style={{ overflow: "scroll", maxHeight: "40vh" }}>
      {globalState.replValue
        .filter((element: string) => element !== "")
        .map((component: string, i: number) => {
          return (
            <>
              <Card className={classes.root}>
                {component.split("\n").map((i) => (
                  <p>{i}</p>
                ))}
              </Card>
              <Card className={classes.root}>
                {globalState.run
                  ? globalState.replComponents[i + 1]
                  : globalState.replComponents[i]}
              </Card>
            </>
          );
        })}
    </div>
  );

  return (
    <div style={{ maxHeight: "50vh", overflowY: "scroll" }}>
      {globalState.run &&
        globalState.replComponents[0] !== undefined &&
        runComponent}
      {componentList}
      <Card className={classes.root}>
        <CardContent>
          <AceEditor
            className="react-ace"
            mode="javascript"
            theme="future"
            height="5vh"
            width="inherit"
            fontSize={14}
            value={globalState.eval ? "" : code}
            tabSize={4}
            onChange={onChangeMethod}
            style={{ zIndex: 0 }}
            setOptions={{
              fontFamily: "'Inconsolata', 'Consolas', monospace",
              showLineNumbers: false,
              showGutter: false,
            }}
          />
        </CardContent>
        <CardActions>
          <EvalButton code={code} />
        </CardActions>
      </Card>
    </div>
  );
}
