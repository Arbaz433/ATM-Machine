#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 50000;
let myPin = 27229;

//wellcome messege

console.log(chalk.yellow("\n \tWELLCOME TO ARBAZ ALI ATM MACHINE\n "));

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: chalk.blue("Enter your pin code please"),

}
])
if (pinAnswer.pin === myPin){
    console.log(chalk.green("\nPin Is Correct , Login Successfully!\n"));

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Choose an Option",
            choices: ["withdraw amount" , "check balance"]
        }

    ])

    if(operationAns.operation === "withdraw amount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "slect a withdraw method",
                choices: ["Fast Cash","Enter Amount"],
            }
        ])
        if(withdrawAns.withdrawMethod === "Fast Cash" ){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Slect Amount",
                    choices: [5000, 10000, 20000, 30000, 40000, 50000, 60000],
                }
            ])
            if(fastCashAns.fastCash > myBalance ){
                console.log (chalk.red("Insufficient Balance"));
            }
            
            else{
                myBalance -= fastCashAns.fastCash
                console.log (chalk.gray(`${fastCashAns.fastCash} Withdraw Successfull!`));
                console.log (chalk.magenta(`Your Remaining Balance is: ${myBalance}`));
            }
        }
       else if(withdrawAns.withdrawMethod === "Enter Amount"){
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the Amount to Withdraw",
                }
            ])
            if(amountAns.amount > myBalance){
                console.log(chalk.red("Insufficient Balance"));
    
            }
            else{
                myBalance -= amountAns.amount;
                console.log(chalk.gray(`${amountAns.amount} Withdraw Successfull!`));
                console.log(chalk.magenta(`Your Remaining Balance is ${myBalance}`));
            }
        }
       

    }
    else if(operationAns.operation === "check balance")
    console.log(`Your Account Balance is ${myBalance}`);
}
else {
    console.log(chalk.red("Incorrect Pin! please Try Again"))
}