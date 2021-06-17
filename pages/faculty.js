import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import AppNavBar from "../components/DashBar";
import Footer from "../components/footer";
import Alert from "@material-ui/lab/Alert";

const columns = [
	{ field: "id", headerName: "Initial", width: 122 },
	{ field: "Name", headerName: "Name", width: 400 },
	{ field: "Email", headerName: "Initial", width: 400, sortable: false },
];
var rows = [
	{
		id: "AAI",
		Name: "Mr. Azwad Anjum Islam",
		Email: "azwad.islam@bracu.ac.bd",
	},
	{
		id: "AAR",
		Name: "Mr. Annajiat Alim Rasel",
		Email: "annajiat@bracu.ac.bd",
	},
	{
		id: "ABA",
		Name: "Mr. Mohammed Abid Abrar",
		Email: "abid.abrar@bracu.ac.bd",
	},
	{
		id: "ACH",
		Name: "Dr. Amitabha Chakrabarty",
		Email: "amitabha@bracu.ac.bd",
	},
	{
		id: "ADR",
		Name: "Md. Abdur Rahman",
		Email: "abdur.rahman@bracu.ac.bd",
	},
	{
		id: "AHF",
		Name: "Abdulla Hil Kafi",
		Email: "abdulla.kafi@bracu.ac.bd",
	},
	{
		id: "AHR",
		Name: "Ms. Ahanaf Hassan Rodoshi",
		Email: "ahanaf.hassan@bracu.ac.bd",
	},
	{
		id: "AKO",
		Name: "Mr. Mujtahid Al-Islam Akon",
		Email: "mujtahid.akon@bracu.ac.bd",
	},
	{
		id: "AMK",
		Name: "Dr. Abu Mohammad Khan",
		Email: "abu.khan@bracu.ac.bd",
	},
	{
		id: "ARA",
		Name: "Meem Arafat Manab",
		Email: "ext.meem.arafat@bracu.ac.bd",
	},
	{
		id: "ARF",
		Name: "Mr. Arif Shakil",
		Email: "arif.shakil@bracu.ac.bd",
	},
	{
		id: "ARK",
		Name: "Ms. Arnisha Khondaker",
		Email: "arnisha.khondaker@bracu.ac.bd",
	},
	{
		id: "ARP",
		Name: "Mr. Arghya Pratim Pal",
		Email: "arghya.pal@bracu.ac.bd",
	},
	{
		id: "ASA",
		Name: "Dr. Md. Ashraful Alam",
		Email: "ashraful.alam@bracu.ac.bd",
	},
	{
		id: "ASH",
		Name: "ASIF SHAHRIYAR SUSHMIT",
		Email: "ext.cse46@bracu.ac.bd",
	},
	{
		id: "ATR",
		Name: "‪Raihana Shams Islam Antara",
		Email: "raihanashams.antara@bracu.ac.bd",
	},
	{
		id: "AZQ",
		Name: "Mr. Md. Ajwaad Zaman Quashef",
		Email: "ajwaad.zaman@bracu.ac.bd",
	},
	{
		id: "BRH",
		Name: "Mr. Beig Rajibul Hasan",
		Email: "rajib.hasan@bracu.ac.bd",
	},
	{
		id: "DZK",
		Name: "Mr. Dewan Ziaul Karim",
		Email: "ziaul.karim@bracu.ac.bd",
	},
	{
		id: "E01",
		Name: "Abu Musa Al Ashary",
		Email: "ext.cse.12@bracu.ac.bd",
	},
	{
		id: "E02",
		Name: "Dipika Barman",
		Email: "ext.cse39@bracu.ac.bd",
	},
	{
		id: "E03",
		Name: "Md. Farhan Shadiq",
		Email: "ext.cse41@bracu.ac.bd",
	},
	{
		id: "E04",
		Name: "Nazmul Haque Turja",
		Email: "ext.cse42@bracu.ac.bd",
	},
	{
		id: "E05",
		Name: "Fariba Islam",
		Email: "ext.cse43@bracu.ac.bd",
	},
	{
		id: "E06",
		Name: "Turjja Dutta",
		Email: "ext.cse38@bracu.ac.bd",
	},
	{
		id: "E07",
		Name: "M. Sifatul Alam",
		Email: "ext.cse40@bracu.ac.bd",
	},
	{
		id: "EHK",
		Name: "Mr. Ehsanul Kabir",
		Email: "ehsanul.kabir@bracu.ac.bd",
	},
	{
		id: "ESF",
		Name: "Mr. A. M. Esfar-E-Alam",
		Email: "esfar.alam@bracu.ac.bd",
	},
	{
		id: "FBA",
		Name: "Mr. Faisal Bin Ashraf",
		Email: "faisal.ashraf@bracu.ac.bd",
	},
	{
		id: "FFZ",
		Name: "Mr. Farhan Feroz",
		Email: "farhan.feroz@bracu.ac.bd",
	},
	{
		id: "HAI",
		Name: "Mr. H M Ashiqul Islam",
		Email: "ashiqul.islam@bracu.ac.bd",
	},
	{
		id: "HOS",
		Name: "Mr. Hossain Arif",
		Email: "hossain.arif@bracu.ac.bd",
	},
	{
		id: "IBA",
		Name: "Md. Imran Bin Azad",
		Email: "imran.azad@bracu.ac.bd",
	},
	{
		id: "ISH",
		Name: "Mr. Ismail Hossain",
		Email: "ismail.hossain@bracu.ac.bd",
	},
	{
		id: "JNM",
		Name: "Ms. Jannatun Noor Mukta",
		Email: "jannatun.noor@bracu.ac.bd",
	},
	{
		id: "KHR",
		Name: "Dr. Md. Khalilur Rahman",
		Email: "khalilur@bracu.ac.bd",
	},
	{
		id: "M01",
		Name: "Anna Mary Mondol",
		Email: "ext.cse.2@bracu.ac.bd",
	},
	{
		id: "M02",
		Name: "Nakhla Rafi",
		Email: "ext.cse36@bracu.ac.bd",
	},
	{
		id: "M03",
		Name: "Joydhriti Choudhury",
		Email: "ext.joydhriti.choudhury@bracu.ac.bd",
	},
	{
		id: "M04",
		Name: "Zaber Mohammad",
		Email: "zaber.mohammad@bracu.ac.bd",
	},
	{
		id: "M05",
		Name: "Saadat Hasan Khan",
		Email: "ext.cse.5@bracu.ac.bd",
	},
	{
		id: "M06",
		Name: "Sifat Ut Taki",
		Email: "ext.cse.7@bracu.ac.bd",
	},
	{
		id: "M08",
		Name: "Mahjabeen Tamanna Abed",
		Email: "est.cse.22@bracu.ac.bd",
	},
	{
		id: "M09",
		Name: "Prommy Sultana Hossain",
		Email: "ext.cse.4@bracu.ac.bd",
	},
	{
		id: "M10",
		Name: "Modhumonty Das",
		Email: "ext.cse.21@bracu.ac.bd",
	},
	{
		id: "M11",
		Name: "H.M Sadman Amin",
		Email: "ext.cse.17@bracu.ac.bd",
	},
	{
		id: "M13",
		Name: "Moshiur Rahman",
		Email: "ext.cse.14@bracu.ac.bd",
	},
	{
		id: "M14",
		Name: "Fairoz Nower Khan",
		Email: "fairoz.khan@bracu.ac.bd",
	},
	{
		id: "M15",
		Name: "Rafeed Rahman",
		Email: "ext.cse.20@bracu.ac.bd",
	},
	{
		id: "M16",
		Name: "Jumana",
		Email: "ext.cse.10@bracu.ac.bd",
	},
	{
		id: "M17",
		Name: "Sadman Araf",
		Email: "ext.cse.25@bracu.ac.bd",
	},
	{
		id: "M19",
		Name: "Md. Aquib Azmain",
		Email: "ext.cse31@bracu.ac.bd",
	},
	{
		id: "M21",
		Name: "Shakir Rouf",
		Email: "ext.shakir.rouf@bracu.ac.bd",
	},
	{
		id: "M23",
		Name: "Sajib Kumar Saha Joy",
		Email: "ext.cse.16@bracu.ac.bd",
	},
	{
		id: "M24",
		Name: "Mohammad Tanvir Mahtab",
		Email: "ext.cse.24@bracu.ac.bd",
	},
	{
		id: "M25",
		Name: "Sumaiya Tanjil Khan",
		Email: "ext.sumaiya.tanjil@bracu.ac.bd",
	},
	{
		id: "M26",
		Name: "Tasfia Anika Bushra",
		Email: "ext.cse.27@bracu.ac.bd",
	},
	{
		id: "M27",
		Name: "Tauhid Tanjim",
		Email: "ext.cse.28@bracu.ac.bd",
	},
	{
		id: "M28",
		Name: "Md. Muzahdiul Islam Rahi",
		Email: "muzahidul.islam@bracu.ac.bd",
	},
	{
		id: "M29",
		Name: "Anika Islam Apsara",
		Email: "ext.cse.29@bracu.ac.bd",
	},
	{
		id: "M34",
		Name: "Mohammad Badrul Hossain",
		Email: "ext.cse35@bracu.ac.bd",
	},
	{
		id: "M35",
		Name: "Benjir Islam Alvee",
		Email: "benjir.islam@bracu.ac.bd",
	},
	{
		id: "M36",
		Name: "Nasif Noor Saleheen",
		Email: "ext.cse37@bracu.ac.bd",
	},
	{
		id: "M37",
		Name: "Samiha Sultana",
		Email: "ext.cse.11@bracu.ac.bd",
	},
	{
		id: "M38",
		Name: "Aminul Islam Anik",
		Email: "ext.cse.23@bracu.ac.bd",
	},
	{
		id: "M39",
		Name: "Ismat Sifat",
		Email: "ext.ismat.sifat@bracu.ac.bd",
	},
	{
		id: "M40",
		Name: "Saquib Ahmed",
		Email: "ext.saquib.ahmed@bracu.ac.bd",
	},
	{
		id: "M41",
		Name: "Md.Sabbir Ahmed",
		Email: "md.sabbir.ahmed@g.bracu.ac.bd",
	},
	{
		id: "M42",
		Name: "Zahin Ahmed",
		Email: "zahinahmed97@gmail.com",
	},
	{
		id: "M43",
		Name: "Samiha Haque",
		Email: "samiha.haque@g.bracu.ac.bd",
	},
	{
		id: "M45",
		Name: "Sifat Tanvir",
		Email: "sifat.tanvir@g.bracu.ac.bd",
	},
	{
		id: "M46",
		Name: "AFIA FAIROOSE ABEDIN",
		Email: "afia.fairoose.abedin@g.bracu.ac.bd",
	},
	{
		id: "M47",
		Name: "Md. Reasad Zaman Chowdhury",
		Email: "zamanreasad@gmail.com",
	},
	{
		id: "M48",
		Name: "Muhammad Tahmeed Abdullah",
		Email: "tahmeedabdullah1996@gmail.com",
	},
	{
		id: "M49",
		Name: "Taufiqul Islam Khan",
		Email: "taufiqulislamkhan@gmail.com",
	},
	{
		id: "M50",
		Name: "Homaira Huda Shomee",
		Email: "homaira.huda.shomee@g.bracu.ac.bd",
	},
	{
		id: "MEH",
		Name: "Mr. Mehedi Hasan Himel",
		Email: "mehedi.hasan.himel@bracu.ac.bd",
	},
	{
		id: "MFT",
		Name: "Mr. Mirza Farhan Bin Tarek",
		Email: "mirza.tarek@bracu.ac.bd",
	},
	{
		id: "MGR",
		Name: "Dr. Md. Golam Rabiul Alam",
		Email: "rabiul.alam@bracu.ac.bd",
	},
	{
		id: "MHB",
		Name: "Mr. Mursalin Habib",
		Email: "mursalin.habib@bracu.ac.bd",
	},
	{
		id: "MHT",
		Name: "Ms. Mahrin Tasfe",
		Email: "mahrin.tasfe@bracu.ac.bd",
	},
	{
		id: "MIH",
		Name: "Dr. Muhammad Iqbal Hossain",
		Email: "iqbal.hossain@bracu.ac.bd",
	},
	{
		id: "MMM",
		Name: "Mr. Moin Mostakim",
		Email: "mostakim@bracu.ac.bd",
	},
	{
		id: "MOM",
		Name: "Mr. Mobashir Monim",
		Email: "mobashir.monim@bracu.ac.bd",
	},
	{
		id: "MSA",
		Name: "Dr. Matin Saad Abdullah",
		Email: "mabdullah@bracu.ac.bd",
	},
	{
		id: "MSI",
		Name: "Mr. Md. Saiful Islam",
		Email: "md.saiful.islam@bracu.ac.bd",
	},
	{
		id: "MTH",
		Name: "Mohammad Tawhidul Hasan Bhuiyan",
		Email: "tawhidulhasan13@gmail.com",
	},
	{
		id: "MZH",
		Name: "Mr. Mohammad Zahidul Hasan",
		Email: "zadid.hasan@bracu.ac.bd",
	},
	{
		id: "MZP",
		Name: "Dr. Mohammad Zavid Parvez",
		Email: "zavid.parvez@bracu.ac.bd",
	},
	{
		id: "NAB",
		Name: "Nishat Anjum Bristy",
		Email: "nishatanjumbristy@gmail.com",
	},
	{
		id: "NAH",
		Name: "Mr. A.K.M. Naziul Haque",
		Email: "naziul.haque@bracu.ac.bd",
	},
	{
		id: "NNC",
		Name: "Ms. Najeefa Nikhat Choudhury",
		Email: "najeefa.chy@bracu.ac.bd",
	},
	{
		id: "NRT",
		Name: "Ms. Nadia Rubaiyat",
		Email: "nadia.rubaiyat@bracu.ac.bd",
	},
	{
		id: "NTR",
		Name: "Ms. Narzu Tarannum",
		Email: "narzu.tarannum@bracu.ac.bd",
	},
	{
		id: "NZN",
		Name: "Mr. Nabuat Zaman Nahim",
		Email: "nabuat.zaman@bracu.ac.bd",
	},
	{
		id: "RAK",
		Name: "Mr. Rubayat Ahmed Khan",
		Email: "rubayat.ahmed@bracu.ac.bd",
	},
	{
		id: "RRD",
		Name: "Mr. Rayhan Rashed",
		Email: "rayhan.rashed@bracu.ac.bd",
	},
	{
		id: "RSA",
		Name: "Mr. Ramkrishna Saha",
		Email: "rk.saha@bracu.ac.bd",
	},
	{
		id: "SAA",
		Name: "Mr. Samin Azhan",
		Email: "samin.azhan@bracu.ac.bd",
	},
	{
		id: "SAD",
		Name: "Mr. Salman Sayeed Khan",
		Email: "salman.sayeed@bracu.ac.bd",
	},
	{
		id: "SEJ",
		Name: "Ms. Sifat E Jahan",
		Email: "sifat.jahan@bracu.ac.bd",
	},
	{
		id: "SHA",
		Name: "Mr. Shahnewaz Ahmed",
		Email: "shahnewaz.ahmed@bracu.ac.bd",
	},
	{
		id: "SHS",
		Name: "Mr. Shadman Shahriar",
		Email: "shadman.shahriar@bracu.ac.bd",
	},
	{
		id: "SKZ",
		Name: "Dr. Sadia Hamid Kazi [Chairperson]",
		Email: "skazi@bracu.ac.bd",
	},
	{
		id: "SMA",
		Name: "Shashata Sawmya",
		Email: "shashata003@gmail.com",
	},
	{
		id: "SMU",
		Name: "Mr. Mirza Md. Tanjim Shorif Mugdho",
		Email: "mirza.mugdho@bracu.ac.bd",
	},
	{
		id: "SQS",
		Name: "Sadiq Shahriyar Nishat",
		Email: "ext.cse.13@bracu.ac.bd",
	},
	{
		id: "SRF",
		Name: "Ms. Syeda Ramisa Fariha",
		Email: "ramisa.fariha@bracu.ac.bd",
	},
	{
		id: "SRJ",
		Name: "Ms. Mehnaz Seraj",
		Email: "seraj.mehnaz@bracu.ac.bd",
	},
	{
		id: "SRO",
		Name: "Ms. Shaily Roy",
		Email: "shaily.roy@bracu.ac.bd",
	},
	{
		id: "SSN",
		Name: "Mr. Mirza Md. Tausif Shorif Snigdho",
		Email: "mirza.tausif@bracu.ac.bd",
	},
	{
		id: "SSY",
		Name: "Shehran Syed",
		Email: "shehran.syed@bracu.ac.bd",
	},
	{
		id: "SZH",
		Name: "Mr. Syed Zamil Hasan Shoumo",
		Email: "shoumo.hasan@bracu.ac.bd",
	},
	{
		id: "SZI",
		Name: "Ms. Sabrina Zaman Ishita",
		Email: "sz.ishita@bracu.ac.bd",
	},
	{
		id: "TAA",
		Name: "Mr. Tanvir Ahmed",
		Email: "tanvir.ahmed@bracu.ac.bd",
	},
	{
		id: "TAW",
		Name: "Mr. Md. Tawhid Anwar",
		Email: "tawhid.anwar@bracu.ac.bd",
	},
	{
		id: "TKT",
		Name: "Tasmin Kamal Tulka",
	},
	{
		id: "TMA",
		Name: "Tanvir Ahmed Masum",
		Email: "ext.cse45@bracu.ac.bd",
	},
	{
		id: "TNR",
		Name: "Mr. Tanvir Rahman",
		Email: "tanvir.rahman@bracu.ac.bd",
	},
	{
		id: "TOD",
		Name: "Tonushree Dutta",
		Email: "ext.cse44@bracu.ac.bd",
	},
	{
		id: "TRZ",
		Name: "Mr. Md. Tanzim Reza",
		Email: "tanzim.reza@bracu.ac.bd",
	},
	{
		id: "WAR",
		Name: "Ms. Warida Rashid",
		Email: "warida.rashid@bracu.ac.bd",
	},
];

const DataTable = () => {
	return (
		<div>
			<AppNavBar></AppNavBar>
			<Typography variant="h4" align="center">
				List of All Faculties
			</Typography>
			<div style={{ height: 900, width: "100%" }}>
				<DataGrid rows={rows} columns={columns} pageSize={30} />
			</div>
			<Footer />
		</div>
	);
};

export default DataTable;
