/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import abi from "./utils/BuyMeACoffee.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { withdrawTips } from "./utils/withdrawTips";

const { ethereum } = window;
const contractAddress = "0x785c92d132f35aB79B3A116FFD813021fD44fA55";
const contractAbi = abi.abi;
const provider = new ethers.providers.Web3Provider(ethereum, "any");

function App() {
  const runWithdrawTips = async () => {
    // const res = await provider.getBalance(contractAddress);
    // const contractBal = ethers.utils.formatEther(res.toString());
    await withdrawTips(provider, contractAddress, contractAbi);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-background pt-16">
      <div className="text-3xl font-medium">
        Buy{" "}
        <span onClick={runWithdrawTips} className="text-4xl text-primary">
          Mohsin
        </span>{" "}
        A Coffee!
      </div>
      <SocialIcons />
      <FormCard />
      <div className="text-xl font-semibold">Recent Supporters</div>
      <Supporters />
      <Footer />
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="flex items-center justify-center gap-8">
      <a href="https://twitter.com/khan_mohsin07" target="blank">
        <img src="twitter.svg" alt="twitter"></img>
      </a>
      <a href="https://github.com/mohsin-khan07" target="blank">
        <img src="github.svg" alt="github"></img>
      </a>
      <a href="https://www.linkedin.com/in/mohsin-khan07/" target="blank">
        <img src="linkedin.svg" alt="linkedin"></img>
      </a>
    </div>
  );
}

function FormCard() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-grey3 bg-white p-8">
      <Quantity quantity={quantity} setQuantity={setQuantity} />
      <div className="text-grey2">1 Coffee = 0.001ETH</div>
      <Form quantity={quantity} />
    </div>
  );
}

function Quantity({ quantity, setQuantity }) {
  return (
    <div className="flex items-center justify-center gap-5">
      <img src="coffee.svg" alt="coffee"></img>
      <select
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="appearance-none rounded-full border-none bg-grey4 px-10 py-4 font-semibold text-secondary outline-none"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
  );
}

function Form({ quantity }) {
  const [account, setAccount] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Please install a wallet!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      console.log("Connected account: ", account);
      setIsWalletConnected(true);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!ethereum) {
        alert("Wallet not connected!");
        return;
      }

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer,
      );

      const coffeeTxn = await contract.buyCoffee(
        name ? name : "Anonymous",
        message ? message : "Enjoy your coffee!",
        { value: ethers.utils.parseEther(`${0.001 * quantity}`) },
      );
      await coffeeTxn.wait();

      setName("");
      setMessage("");

      console.log("mined: ", coffeeTxn.hash);
      alert("coffee purchased 😍");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Anonymous"
        className="w-[440px] rounded-xl bg-grey4 px-4 py-3 text-grey2"
      ></input>
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Enjoy your coffee!"
        className="h-24 w-[440px] rounded-xl bg-grey4 px-4 py-3 text-grey2"
      ></input>
      <div
        onClick={isWalletConnected ? handleSubmit : connectWallet}
        className={`${isWalletConnected ? "" : "bg-secondary"} flex w-full cursor-pointer items-center justify-center rounded-full bg-primary py-3 font-semibold text-white`}
      >
        {isWalletConnected
          ? `Send ${quantity} Coffee for ${0.001 * quantity}ETH`
          : "Connect Wallet"}
      </div>
    </div>
  );
}

function Supporters() {
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const onNewMemo = async (from, timestamp, name, message) => {
      console.log("Memo received: ", { from, timestamp, name, message });
      setMemos((state) => [
        ...state,
        { address: from, timestamp: new Date(timestamp * 1000), name, message },
      ]);
    };

    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider,
    );
    contract.on("NewMemo", onNewMemo);

    return () => {
      if (contract) {
        contract.off("NewMemo", onNewMemo);
      }
    };
  }, []);

  return (
    <div className="flex w-[440px] flex-col items-center justify-center gap-6">
      <Memos memos={memos} />
    </div>
  );
}

function Memos({ memos }) {
  return memos.map((memo) => (
    <div key={memo.timestamp} className="flex w-full flex-col gap-3">
      <p>{memo.name}</p>
      <p className="text-grey2">{`"${memo.message}"`}</p>
      <div className="w-full border border-grey3"></div>
    </div>
  ));
}

function Footer() {
  return (
    <div className="flex items-center justify-center gap-4 py-10 text-grey2">
      <div>
        Created by{" "}
        <a
          className="font-medium text-primary"
          href="https://twitter.com/khan_mohsin07"
          target="_blank"
          rel="noreferrer"
        >
          Mohsin Khan.
        </a>{" "}
        Check out the source code on{" "}
        <a
          className="font-medium text-primary"
          href="https://github.com/mohsin-khan07/BuyMeACoffee"
          target="_blank"
          rel="noreferrer"
        >
          GitHub.
        </a>
      </div>
    </div>
  );
}

export default App;
