import React from 'react'
import HeaderBox from '../../components/HeaderBox'
import TotalBalanceBox from '../../components/TotalBalanceBox';
import RightSidebar from '../../components/RightSidebar';
import { getLoggedInUser } from '../../lib/actions/user.action';
import { getAccount, getAccounts } from '../../lib/actions/bank.action';
import { Slice } from 'lucide-react';
import RecentTansactions from '../../components/RecentTansactions';

const Home =  async ({searchParams:{id,page}}:SearchParamProps) => {
  const currentPage =  Number(page as string) || 1;
    const loggedIn =  await getLoggedInUser();
    const accounts = await getAccounts({ userId: loggedIn.$id})

    if(!accounts) return;

    const accountsData=accounts?.data;


    const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId;

    const account = await getAccount({appwriteItemId})


  return (
    <section className="home">
<div className="home-content">
    <header className="home-header">
       <HeaderBox
       type="greeting"
       title="Welcome"
       user={loggedIn?.firstName || 'Guest'}
       subtext="Access and manage your account and transactions efficiently"/>
       <TotalBalanceBox
       accounts={accountsData}
       totalBanks={accounts?.totalBanks}
       totalCurrentBalance={accounts?.totalCurrentBalance}
       />
    </header>
    <RecentTansactions
    accounts={accountsData}
    transactions={account?.transactions}
    appwriteItemId={appwriteItemId}
    page={currentPage}
    />
</div>
<RightSidebar
user={loggedIn}
transactions={accounts?.transactions}
banks={accountsData?.slice(0, 2)}
/>
    </section>
  )
}

export default Home
