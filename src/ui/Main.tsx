import { useState } from "react";
import { Button, Stack } from "react-bootstrap";

function Main({ children }: { children: React.ReactNode }) {
  const [toggle, setToggle] = useState<boolean>(false);
  function handleToggle(val: boolean) {
    setToggle(val);
  }
  return (
    <main className={`${toggle === true ? "gridView-w" : "listView-w"}`}>
      <Stack direction="horizontal" gap={3}>
        <Button variant="outline" className="text-light">
          Today
        </Button>
        <Button variant="outline" className="text-light">
          Trending
        </Button>
        <Button variant="outline" className="text-light">
          Staff Picks
        </Button>
        <Button variant="outline" className="text-light">
          Answer Time
        </Button>
        <Button variant="outline" className="text-light">
          More
        </Button>

        <div className="d-flex ms-auto gap-1 view-cnt">
          <div>
            <i
              className={`bi bi-grid-1x2-fill ${toggle === true ? "actv" : ""}`}
              role="button"
              onClick={() => handleToggle(true)}
            ></i>
          </div>
          <div>
            <i
              className={`bi bi-distribute-vertical ${
                toggle === false ? "actv" : ""
              }`}
              onClick={() => handleToggle(false)}
              role="button"
            ></i>
          </div>
        </div>
      </Stack>
      <div
        className={`mansoryLayout ${toggle == true ? "gridView" : "listView"}`}
      >
        {children}
      </div>
    </main>
  );
}

export default Main;
