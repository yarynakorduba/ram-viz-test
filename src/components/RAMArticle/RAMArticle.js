import React from "react";
import BEM from "../../helpers/BEM";

import ArticleSection from "../ArticleSection";

import MemoryCellCircuit from "../../icons/memoryCellCircuit.svg";
import MemoryBlock from "../../icons/memoryBlock.svg";
import MemoryBlocks from "../../icons/memoryBlocks.svg";
import MemoryBank from "../../icons/memoryBank.svg";
import MemoryBankRowCol from "../../icons/memoryBankRowCol.svg";
import MemoryBankRasCas from "../../icons/memoryBankRasCas.svg";

import "./RAMArticle.scss";

const b = BEM("RAMArticle");

const RAMArticle = () => {
  return (
    <div className={b()}>
      <section className={b("preface")}>
        <h1 className={b("heading", ["primary"])}>Random Access Memory [RAM]</h1>
        <section className={b("contents")}>
          <a className={b("topicRef")} href="#understandingRAM">
            Understanding RAM
          </a>
          <a className={b("topicRef")} href="#clockTimingsChapter">
            Clock Timings
          </a>
          <a className={b("topicRef")} href="#rasCasChapter">
            RAS and CAS
          </a>
          <a className={b("topicRef", ["emphasised"])} href="#playground">
            Directly to RAM Playground
          </a>
        </section>
      </section>
      <ArticleSection name="introduction" displayedName={"Understanding RAM"}>
        <h2 id="understandingRAM" className={b("heading", ["secondary"])}>
          Understanding RAM
        </h2>
        <p className={b("paragraph")}>
          RAM (Random Access Memory) is a high-speed storage that computers utilize to temporarily store and access the
          working data. Each application we run on our computer requires some amount of temporary memory to operate
          efficiently. In simple terms, RAM is like a pocket, where computer keeps the frequently needed data, while
          keeping remaining stuff in the bag. The reason for this is that a computer can access this "pocket" with less
          time compared to opening the "bag" and getting things out of it. The term random access as applied to RAM
          comes from the fact that we can access any memory address directly and without any predefined order.
        </p>
        <p className={b("paragraph")}>
          The major activities of CPU (Central Processing Unit) include reading from RAM and writing to RAM. Modern
          computer memory is organized in a set of rows and columns, much as a matrix. Similar to the matrix, memory is
          organized in a set of rows and columns. To write or read from the specific memory address, we need to send the
          desired address from the CPU to the memory. The address is passed to the memory in the binary form. Similarly,
          the data inside the memory is written & read and stored in the binary form. The information is transmitted
          between CPU and RAM using the buses. Bus is simply a collection of wires through which the data is
          transmitted. Each wire transmits a single stream of 0s and 1s. So bus can transmit as many bits simultaneously
          as many wires, or in other words lines, it has.
        </p>
        <p className={b("paragraph")}>
          There are such main categories of wires (buses) connecting the RAM to the CPU:
          <ul>
            <li>Address bus - sends bits of the selected memory address from the CPU to the memory.</li>
            <li>
              Data bus - is bidirectional, meaning it is used for both sending the actual data to the memory and getting
              the read data from the memory.
            </li>
            <li>
              Control bus with the following lines (wires):
              <ul>
                <li>
                  Read / Write - instructs the memory that CPU would like to read data from the memory or write data
                  into it;
                </li>
                <li>Output enable - controls whether the memory snoops the address bus and can drive the data bus.</li>
              </ul>
            </li>
          </ul>
        </p>
        <p className={b("paragraph")}>
          The smallest atomic piece of memory is a memory cell which can store and retrieve just one bit of information,
          either 1 or 0. The main parts of the memory cell circuit are the so-called flip-flop (it remembers the data
          bit) and the so-called bi-directional bus transceiver (which controls the direction of data flow -- to the
          flip-flop of from it).
        </p>
        <img src={MemoryCellCircuit} className={b("schema", ["cellCircuit"])} />
        <p className={b("paragraph")}>
          Or course, storing one bit of information is not very useful. But we are not limited to one memory cell. We
          can put several elementary memory cells into a memory module and use an address to select one of them. For
          example, if we take 256 memory cells we need an 8-bit wide address bus to have the ability to point to each of
          our cells - to address it.
        </p>
        <img src={MemoryBlock} className={b("schema", ["cellBlock"])} />
        <p className={b("paragraph")}>
          But, first of all, one bit is too few for most practical usages. Let us group several memory modules with 256
          bits each in parallel. The same address is sent to each module selecting the same address. As a result, memory
          can read or write several bits at a time. For example, 8-bit memory means that such a memory module can read
          or write 8 bits -- one byte at a time.
        </p>
        <img src={MemoryBlocks} className={b("schema", ["memoryBlocks"])} />
        <p className={b("paragraph")}>
          Instead of thinking of it as a series of individual memory modules and circuits, we will move to another level
          of abstraction and think of it as a uniform bank of addressable memory, which can store 2<sup>M</sup> words of
          the length N bit, where M is the width of the address bus and N is the width of the data bus.
        </p>
        <img src={MemoryBank} className={b("schema", ["memoryBank"])} />
        <p className={b("paragraph")}>
          Let us discuss a memory bank whose address bus has 8 address wires and data bus has 8 data wires. In this case
          the CPU can access 2^8 = 256 address locations. The address range is from 0000 0000 to 1111 1111, which
          represents a number in a range from 0 to 255 in decimal view. As there are 8 data wires, each location can
          keep 8 bits of data (1 byte). The data range is the same, from 0000 0000 to 1111 1111 (from 0 to 255).
        </p>
      </ArticleSection>
      <ArticleSection name="clockTimings" displayedName={"Clock Timings"}>
        <h2 id="clockTimingsChapter" className={b("heading", ["secondary"])}>
          Clock Timings
        </h2>
        <p className={b("paragraph")}>
          Of course, passing of the information from CPU into RAM and vice versa is not executed immediately. It takes
          some time to send the information at a certain speed through the wires and read / write it to the memory. The
          delay which occurs in the data transmission as the data moves between CPU and RAM is called RAM latency. RAM
          latency is measured in terms of memory bus clock cycles. A clock cycle is a pulse used to synchronize the
          operations of the components of a CPU and other parts of the computer, such as a memory. The fewer clock
          cycles, the lower the latency. The lower the latency, the better. The speed at which the CPU or the memory can
          respond to the clock cycles is called its clock speed and is measured in hertz (Hz). One Hz equals to one
          cycle per second. The number of cycles per second depends on the specific hardware and is defined by its
          producers (you can find this information on the chips documentation). Today's personal computers run at a
          clock speed of several gigahertz.
        </p>
        <p className={b("paragraph")}>
          The type of RAM which has its operations orchestrated by an externally supplied clock signal is called SDRAM
          (Synchronous Dynamic random-access memory). So there is one more additional clock wire, which can either
          supply 1 or 0 to indicate the constant change of clock cycles.
        </p>
      </ArticleSection>
      <ArticleSection name="rasCas" displayedName={"RAS and CAS"}>
        <h2 id="rasCasChapter" className={b("heading", ["secondary"])}>
          RAS and CAS
        </h2>
        <p className={b("paragraph")}>
          To this point, we were mainly talking about the memory address bus as a group of wires, which pass the index
          of the memory location in the binary format. But, in fact, similar to the matrix, memory is organized into a
          grid of rows and columns. So the address of some location is actually composed of its row and column address.
          To activate a row of RAM, we have to send the memory controller the address of the row we're interested in,
          and similarly, to activate a column, we have to send it the address of the column. These two addresses are
          then combined together.
        </p>
        <img src={MemoryBankRowCol} className={b("schema", ["memoryBank"])} />
        <p className={b("paragraph")}>
          However, let us suppose that while we need 8 address bits, 8 address lines is too much for us for some reason.
          How can we optimise this? Instead of having 8 wires passing the whole address to the memory bank
          simultaneously, we can make use of only 4 address wires to first send 4 bits as a row number, and then using
          the same wires send 4 bits as a column number.
        </p>
        <p className={b("paragraph")}>
          That's why, besides the clock wire, the RAM circuit has two additional control wires. These are RAS (Row
          Access Strobe) and CAS (Column Access Strobe). When data is read or written into memory, the CPU activates the
          RAS line to specify the row of the desired location, and then, after some number of cycles, activates the CAS
          line to specify the column. Combined, the two signals give us the complete location address in DRAM, and only
          after that the data is actually read or written.
        </p>
        <img src={MemoryBankRasCas} className={b("schema", ["memoryBank"])} />
      </ArticleSection>
    </div>
  );
};

export default RAMArticle;
