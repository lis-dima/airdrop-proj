const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const wallet = new Keypair();
const pubKey = new PublicKey(wallet._keypair.publicKey);

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(pubKey);
    return walletBalance;
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
  const balanceInitial = await getWalletBalance();
  console.log(`Balanse is ${balanceInitial}`);
  await airDropSol();
  const balanceAfterTransaction = await getWalletBalance();
  console.log(`Balanse is ${balanceAfterTransaction}`);
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromAirDropSignature = await connection.requestAirdrop(
      pubKey,
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

main();
