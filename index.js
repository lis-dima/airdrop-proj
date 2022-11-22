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
  const balance = await getWalletBalance();
  console.log(`Balanse is ${balance}`);
};

main();
