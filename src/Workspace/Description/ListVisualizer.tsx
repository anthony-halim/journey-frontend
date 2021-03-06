import * as React from "react";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import { LINKS } from "../../utils/constants";

interface IListVisualizerState {
  loading: boolean;
}

class ListVisualizer extends React.Component<{}, IListVisualizerState> {
  private $parent: HTMLElement | null;

  constructor(props: any) {
    super(props);
    this.state = { loading: true };
    this.$parent = null;
  }

  public componentDidMount() {
    this.tryToLoad();
  }

  public render() {
    // Default text will be hidden by visualizer.js when 'draw_data' is called
    return (
      <div ref={(r) => (this.$parent = r)}>
        <p id="data-visualizer-default-text">
          The data visualizer visualises data structures.
          <br />
          <br />
          It is activated by calling the function{" "}
          <code>draw_data(the_data)</code>, where
          <code>the_data</code> would be the data structure that you want to
          visualise.
          <br />
          <br />
          The data visualizer uses box-and-pointer diagrams, as introduced in{" "}
          <a href={LINKS.SOURCE_DOCS_CHAPTER_2_2} target="_blank">
            <i>
              Structure and Interpretation of Computer Programs, JavaScript
              Adaptation, Chapter 2, Section 2
            </i>
          </a>
          .
        </p>
      </div>
    );
  }

  private tryToLoad = () => {
    const element = (window as any).ListVisualizer;
    if (this.$parent && element) {
      // List Visualizer has been loaded into the DOM
      element.init(this.$parent);
      this.setState((state, props) => {
        return { loading: false };
      });
    } else {
      // Try again in 1 second
      window.setTimeout(this.tryToLoad, 1000);
    }
  };
}

export default ListVisualizer;
