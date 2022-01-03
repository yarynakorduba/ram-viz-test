import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import BEM from "../../helpers/BEM";
import "./HowTo.scss";

const b = BEM("HowTo");

const HowTo = () => {
  return (
    <div className={b()}>
      <h3 className={b("header")}>How to:</h3>
      <Accordion>
        <AccordionItem className={b("accordionItem")}>
          <AccordionItemHeading>
            <AccordionItemButton className={b("accordionButton")}>write into memory</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={b("accordionContent")}>
            <ol className={b("instruction")}>
              <li>Pass the data to the input pins by clicking on the black lines in the Input block</li>
              <li>Set "Enable" pin to 1 (click on a black line in Enable block), if it's currently in 0 state</li>
              <li>
                Make sure "Read/Write" pin is currently in "write" state (click on a black line in Read/Write block, if
                not)
              </li>
              <li>Pass the needed address to the address pins by clicking on the black lines in the Address block</li>
              <li>Your data is now written into the memory bank :)</li>
            </ol>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem className={b("accordionItem")}>
          <AccordionItemHeading>
            <AccordionItemButton className={b("accordionButton")}>read from memory</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={b("accordionContent")}>
            <ol className={b("instruction")}>
              <li>
                Make sure "Read/Write" pin is currently in "read" state (click on a black line in Read/Write block, if
                not)
              </li>
              <li>Set "Enable" pin to 1 (click on a black line in Enable block), if it's currently in 0 state</li>
              <li>Pass the needed address to the address pins by clicking on the black lines in the Address block</li>
              <li>The read data is now displayed on the data pins (black lines)</li>
            </ol>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem className={b("accordionItem")}>
          <AccordionItemHeading>
            <AccordionItemButton className={b("accordionButton")}>
              write into memory with manual clock
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={b("accordionContent")}>
            <ol className={b("instruction")}>
              <li>Tick "Manual clock" checkbox</li>
              <li>
                Make sure "Read/Write" pin is currently in "write" state (click on a black line in Read/Write block, if
                not)
              </li>
              <li>Set "Enable" pin to 1 (click on a black line in Enable block), if it's currently in 0 state</li>
              <li>Pass the data to the input pins by clicking on the black lines in the Input block</li>
              <li>Pass the desired address to the address pins by clicking on the black lines in the Address block</li>
              <li>
                The data won't be written to the memory bank right away, because some predefined number of clock tacts
                should pass. To see it more explicitly, we will "tick" the clock manually. Click on the clock pin a
                predefined number of times (equal to the number of cycles indicated).
              </li>
              <li>Your data is now written into the memory bank :)</li>
            </ol>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem className={b("accordionItem")}>
          <AccordionItemHeading>
            <AccordionItemButton className={b("accordionButton")}>write into memory using RAS/CAS</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className={b("accordionContent")}>
            <ol className={b("instruction")}>
              <li>Tick "RAS/CAS" checkbox</li>
              <li>Pass the data to the input pins by clicking on the black lines in the Input block</li>
              <li>Set "Enable" pin to 1 (click on a black line in Enable block), if it's currently in 0 state</li>
              <li>
                Make sure "Read/Write" pin is currently in "write" state (click on a black line in Read/Write block, if
                not)
              </li>
              <li>
                <em>RAS</em> pin is now active. Pass the desired <em>row</em> address to the address pins by clicking on
                the black lines in the Address block
              </li>
              <li>
                "Tick" the clock manually: click on the clock pin a predefined number of times (equal to the number of
                cycles indicated).
              </li>
              <li>
                <em>CAS</em> pin is now active. Pass the desired <em>column</em> address to the address pins by clicking
                on the black lines in the Address block
              </li>
              <li>
                "Tick" the clock manually: click on the clock pin (black line near Clock) a predefined number of times
                (equal to the number of cycles indicated).
              </li>
              <li>Your data is now written into the memory bank :)</li>
            </ol>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HowTo;
