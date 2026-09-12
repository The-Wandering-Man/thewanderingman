import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rules of Association | The Wandering Man Geelong",
  description:
    "The Wandering Man Inc. governing rules, incorporated under the Associations Incorporation Reform Act 2012 (Vic). Filed with Consumer Affairs Victoria.",
  alternates: { canonical: "/governance/rules" },
};

const sections: { number: string; title: string; blocks: { type: "p" | "ul"; text?: string; items?: string[] }[] }[] = [
  {
    number: "1",
    title: "The association’s name",
    blocks: [
      { type: "p", text: "The name of the association is: The Wandering Man." },
    ],
  },
  {
    number: "2",
    title: "The association’s purposes",
    blocks: [
      { type: "p", text: "The purposes of the association are:" },
      { type: "p", text: "In Geelong, the challenges that men face can be as diverse as the population itself, ranging from stress and anxiety related to employment or financial pressures, to more severe mental health conditions such as depression and PTSD." },
      { type: "ul", items: ["The Wandering Man was formed to provide a safe environment, to gather here in Geelong.", "This initiative is not just a meeting, it’s a place where honesty is met with understanding and compassion.", "Each month, we invite guest speakers who share their expertise and personal experiences relating to mental health.", "We believe that through education and shared narratives, we can dismantle the barriers that keep men from seeking help."] },
    ],
  },
  {
    number: "3",
    title: "The association’s powers",
    blocks: [
      { type: "p", text: "The association has the legal capacity of an incorporated body." },
      { type: "p", text: "The association has power to do anything incidental or conducive to achieve its purposes." },
      { type: "p", text: "The association may only:" },
      { type: "ul", items: ["exercise its powers; and", "use its income and assets (including any surplus),"] },
      { type: "p", text: "for its purposes." },
    ],
  },
  {
    number: "4",
    title: "Use of the association’s income and assets",
    blocks: [
      { type: "p", text: "The association must not distribute any surplus, income or assets directly or indirectly to its members. This rule does not prevent the association from:" },
      { type: "ul", items: ["paying its members reimbursement for expenses properly incurred by them or for goods supplied and services provided by them, if this is done in good faith on terms no more favourable than if the member were not a member.", "or distributing any surplus, income or assets in accordance with rule 32 and 32A."] },
    ],
  },
  {
    number: "5",
    title: "Financial year",
    blocks: [
      { type: "p", text: "The financial year of the association starts on 1 July of each year and runs for a period of 12 months (Financial Year)." },
    ],
  },
  {
    number: "6",
    title: "Members",
    blocks: [
      { type: "p", text: "The association must have at least five members." },
      { type: "p", text: "Anyone who supports the purposes of the association can apply to join the association as a member." },
    ],
  },
  {
    number: "7",
    title: "Membership applications",
    blocks: [
      { type: "p", text: "A person may apply to join the association as a member by writing to the Secretary and paying the first year’s annual subscription fee." },
      { type: "p", text: "In these rules, writing includes email and other correspondence in electronic form." },
      { type: "p", text: "Applications for membership of the association must be in the form approved by the Committee (if any)." },
      { type: "p", text: "The Committee can approve or reject a membership application. If the Committee rejects a membership application, it is not required to give reasons for that decision, but it must return the annual subscription fee paid by the applicant (if there is an annual subscription fee) and write to the person to tell them their membership application has been rejected. The Committee must consider applications for membership of the association and notify the applicant of its decision as soon as practicable." },
      { type: "p", text: "A person becomes a member when the Secretary adds the person’s name and address to the members' register." },
      { type: "p", text: "The association must inform the person when their membership has started, and whether they have to pay any annual subscription fee (which will be calculated in proportion to the remaining Financial Year at the time they become a member). That fee (if any) must be paid within the time specified by the Committee." },
    ],
  },
  {
    number: "8",
    title: "Membership Fees",
    blocks: [
      { type: "p", text: "The association does not require any fees, subscriptions or other payments from members." },
    ],
  },
  {
    number: "9",
    title: "Members’ rights, obligations and liabilities",
    blocks: [
      { type: "p", text: "Members have rights, obligations and liabilities as set out in the Act and in these rules." },
      { type: "p", text: "A member of the association who is entitled to vote has the right to:" },
      { type: "ul", items: ["receive notice of general meetings and of proposed special resolutions in the manner and time prescribed by these rules.", "submit items of business for consideration at a general meeting.", "attend and be heard at general meetings.", "vote at general meetings.", "have access to the minutes of general meetings and other documents of the association in accordance with these rules; and", "inspect the register of members."] },
      { type: "p", text: "The rights of a member are not transferable and end when membership stops." },
      { type: "p", text: "Each member’s liability is limited to payment of that member's joining and annual subscription fees (if any)." },
    ],
  },
  {
    number: "10",
    title: "Ending membership",
    blocks: [
      { type: "p", text: "Members can stop being a member of the association at any time by notice in writing to the Secretary." },
      { type: "p", text: "A member stops being a member if:" },
      { type: "ul", items: ["the member resigns in accordance with these rules.", "the member is expelled in accordance with the disciplinary procedures set out in these rules (if any).", "the member dies.", "the member's annual subscription is more than 12 months in arrears; or", "where no annual subscription is payable, the Secretary has made a written request to the member to confirm they wish to remain a member, and the member has not, within three months after receiving that request, confirmed in writing that they wish to remain a member."] },
      { type: "p", text: "When membership ends, the association will not refund any subscription fees already paid. Once a member stops being a member, the Secretary must remove information from the register of members within 14 days in accordance with the Act." },
      { type: "p", text: "Writing includes email and other correspondence in electronic form." },
    ],
  },
  {
    number: "11",
    title: "The Committee",
    blocks: [
      { type: "p", text: "The association is governed by a management committee (Committee) that is made up of committee members elected in accordance with these rules." },
    ],
  },
  {
    number: "12",
    title: "The Committee’s responsibilities and functions",
    blocks: [
      { type: "p", text: "The Committee is responsible for management of the association and can exercise all powers and functions of the association (consistently with these rules and the Act), except for powers and functions that the members are required to exercise at a general meeting (under these rules or the Act)." },
      { type: "p", text: "The Committee can delegate any of its powers and functions to a committee member, a sub-committee, a staff member or a member, other than the power of delegation or a duty imposed on the Committee by the Act or under any other law." },
      { type: "p", text: "The delegation must be in writing, may be subject to any conditions or limitations that the Committee considers appropriate and can be revoked in whole or in part by the Committee in writing." },
      { type: "p", text: "Among its other responsibilities, the Committee is responsible for making sure:" },
      { type: "ul", items: ["accurate minutes of general meetings and committee meetings of the association are made and kept.", "any material personal interest disclosed at a committee meeting is recorded in the minutes of that committee meeting; and", "all records, securities and relevant documents (as defined in the Act) of the association are kept properly and in accordance with these rules."] },
    ],
  },
  {
    number: "13",
    title: "The committee members",
    blocks: [
      { type: "p", text: "The Committee is made up of the following committee members:" },
      { type: "ul", items: ["the President, the Deputy President, the Treasurer, the Secretary (the Office Bearers); and", "up to five ordinary committee members."] },
      { type: "p", text: "Committee members are elected by members of the association at each Annual General Meeting (AGM) and may be elected at a Special General Meeting (SGM) in accordance with these rules." },
      { type: "p", text: "A member is eligible to be elected or appointed as a committee member if the member:" },
      { type: "ul", items: ["is at least 18 years of age; and", "is entitled to vote at a general meeting of the association."] },
    ],
  },
  {
    number: "14",
    title: "Election of the Committee",
    blocks: [
      { type: "p", text: "The AGM or SGM must by resolution decide how many ordinary committee members (if any) it wishes to elect." },
      { type: "p", text: "Each of the office bearer positions must be elected separately." },
      { type: "p", text: "If the AGM or SGM decides to elect any ordinary committee members, those positions must be elected together." },
      { type: "p", text: "Nominations for each position can be made by notifying the Secretary up to 48 hours before the meeting." },
      { type: "p", text: "The chair of the meeting can accept additional nominations at the meeting." },
      { type: "p", text: "Candidates may nominate themselves. Candidates may be nominated by another member, if they consent." },
      { type: "p", text: "If the number of candidates for a position is fewer than the number to be elected:" },
      { type: "ul", items: ["the chair of the meeting must declare elected those candidates who have been nominated; and", "the Committee may fill the remaining vacancies in accordance with the rule about 'committee member resignations, removal and casual vacancies'."] },
      { type: "p", text: "If the number of candidates for a position is equal to the number to be elected, the chair of the meeting must declare those candidates elected." },
      { type: "p", text: "If there are more candidates for a position than the number to be elected, a ballot must be held as set out below." },
      { type: "p", text: "The chair of the meeting must appoint a returning officer to conduct the ballot (who may be the chair of the meeting)." },
      { type: "p", text: "The candidates may each make a short speech in support of their election." },
      { type: "p", text: "An election is usually conducted by show of hands, but can be held by secret ballot if requested by a member or the chair." },
      { type: "p", text: "The returning officer must give:" },
      { type: "ul", items: ["each member present in person or by representative, and", "each proxy appointed by a member (if members may vote by proxy under the general meeting procedure rule),"] },
      { type: "p", text: "a blank piece of paper for each ballot (or, for those present through the use of technology, an equivalent means of registering their vote)." },
      { type: "p", text: "For each ballot, voters must:" },
      { type: "ul", items: ["indicate the candidate or candidates they wish to vote for, including (if not already listed) writing the names of those candidates; and", "not write down the names of more candidates than the number to be elected in that ballot."] },
      { type: "p", text: "Ballot papers that do not comply with these requirements are informal (not valid)." },
      { type: "p", text: "Each formal ballot paper where the name of a candidate has been written down counts as one vote for that candidate." },
      { type: "p", text: "The returning officer must declare elected the number of candidates to be elected who receive the most votes, subject to the requirement below." },
      { type: "p", text: "If two or more candidates receive the same number of votes, and not all of those candidates are to be elected, the returning officer must decide by lot which is to be elected." },
      { type: "p", text: "Writing includes email and other correspondence in electronic form." },
    ],
  },
  {
    number: "15",
    title: "General duties of committee members",
    blocks: [
      { type: "p", text: "As soon as practicable after being elected or appointed to the Committee, each committee member must become familiar with these rules and the Act." },
      { type: "p", text: "The Committee is collectively responsible for ensuring that the association complies with the Act." },
      { type: "p", text: "Committee members must exercise their powers and discharge their duties:" },
      { type: "ul", items: ["with reasonable care and diligence.", "in good faith in the best interests of the association; and", "for a proper purpose."] },
      { type: "p", text: "Committee members and former committee members must not make improper use of:" },
      { type: "ul", items: ["their position; or", "information acquired by virtue of holding their position,"] },
      { type: "p", text: "so as to gain an advantage for themselves or any other person or to cause detriment to the association." },
      { type: "p", text: "In addition to any duties imposed by these rules, a committee member must perform any other duties imposed from time to time by resolution at a general meeting." },
    ],
  },
  {
    number: "16",
    title: "Conflict of interest",
    blocks: [
      { type: "p", text: "A committee member who has a material personal interest in a matter being considered at a committee meeting must disclose the nature and extent of that interest to the Committee and at the next general meeting of members of the association." },
      { type: "p", text: "The committee member:" },
      { type: "ul", items: ["must not be present while the matter is being considered at the meeting; and", "must not vote on the matter."] },
      { type: "p", text: "This rule does not apply to a material personal interest:" },
      { type: "ul", items: ["that exists only because the committee member belongs to a class of persons for whose benefit the association is established; or", "that the committee member has in common with all, or a substantial proportion of, the members of the association."] },
    ],
  },
  {
    number: "17",
    title: "Term of office",
    blocks: [
      { type: "p", text: "Subject to these rules:" },
      { type: "ul", items: ["at each AGM, at least half of the committee members must retire from their role.", "the committee members who must retire will be the committee members who have been longest in office since last being elected.", "where committee members were elected on the same day, the committee members to retire will be decided by lot unless they agree otherwise.", "a committee member who retires under this rule may nominate for re-election.", "other than a committee member appointed to fill a vacancy, a committee member’s term of office starts at the end of the AGM at which they are elected, and ends at the end of the AGM at which they retire.", "each committee member must retire at least once every two years; and", "committee members can be re-elected for a maximum overall term of nine years."] },
    ],
  },
  {
    number: "18",
    title: "The Secretary",
    blocks: [
      { type: "p", text: "The Secretary must be at least 18 years of age, be resident in Australia and consent to being appointed as Secretary." },
      { type: "p", text: "The Secretary must perform any duty or function required under the Act or these rules to be performed by the Secretary." },
    ],
  },
  {
    number: "19",
    title: "Committee member resignations, removal and casual vacancies",
    blocks: [
      { type: "p", text: "A committee member stops being on the Committee if they:" },
      { type: "ul", items: ["stop being a member of the association.", "fail to attend three consecutive committee meetings (other than special or urgent committee meetings) without leave of absence granted by the Committee.", "resign by writing to the Committee or the Secretary.", "are removed by a special resolution of members of the association.", "become insolvent under administration (as the term is defined in section 38 of the Interpretation of Legislation Act 1984).", "become a represented person (under the Guardianship and Administration Act 2019).", "", "otherwise stop being a committee member by operation of section 78 of the Act; or", "in the case of the Secretary, if the Secretary stops residing in Australia."] },
      { type: "p", text: "If a committee member stops being on the Committee before the end of their term in accordance with these rules, the Committee can appoint a member of the association to fill the vacancy on the Committee until the next AGM. If the position of Secretary is vacant for any reason, the Committee must appoint a new Secretary within 14 days." },
      { type: "p", text: "The Committee may act despite any vacancy in its membership." },
      { type: "p", text: "Writing includes email and other correspondence in electronic form." },
    ],
  },
  {
    number: "20",
    title: "Calling committee meetings",
    blocks: [
      { type: "p", text: "The Secretary must give seven days’ written notice of a committee meeting to committee members unless the meeting is an urgent meeting." },
      { type: "p", text: "At an urgent meeting, only the business for which the meeting was called may be conducted." },
      { type: "p", text: "The Committee can decide how often it meets." },
      { type: "p", text: "A special committee meeting may be convened by the President or by a majority of committee members." },
      { type: "p", text: "Writing includes email and other correspondence in electronic form." },
    ],
  },
  {
    number: "21",
    title: "Committee meetings procedure",
    blocks: [
      { type: "p", text: "As long as everyone can hear and communicate clearly at the same time, committee meetings may be held at more than one place using technology (such as telephone or video conferencing)." },
      { type: "p", text: "The President is entitled to chair committee meetings." },
      { type: "p", text: "If the President is not present, or does not wish to chair the meeting, the Deputy President is entitled to chair." },
      { type: "p", text: "If neither the President nor the Deputy President is present, or if neither wishes to chair the meeting, the Committee must elect another committee member to chair." },
      { type: "p", text: "Each committee member has one vote." },
      { type: "p", text: "There is no voting by proxy." },
      { type: "p", text: "The chair of the meeting does not have a casting vote." },
      { type: "p", text: "If an equal number of votes are cast for and against a motion or amendment, the chair of the meeting must declare the motion or amendment lost." },
      { type: "p", text: "Subject to these rules, the procedure to be followed at a committee meeting must be determined from time to time by the Committee." },
      { type: "p", text: "No business may be conducted at a committee meeting unless a quorum is present." },
      { type: "p", text: "The majority (more than half) of committee members must be present (either in person or through the use of technology) for the meeting to be validly held (the quorum)." },
      { type: "p", text: "If a quorum is not present within 30 minutes after the notified commencement time of a committee meeting:" },
      { type: "ul", items: ["in the case of a special meeting, the meeting lapses.", "in any other case, the meeting must be adjourned to a date no later than 14 days after the adjournment and notice of the time, date and place to which the meeting is adjourned must be given in accordance with these rules."] },
    ],
  },
  {
    number: "22",
    title: "General meetings",
    blocks: [
      { type: "p", text: "The association must hold an AGM within five months of the end of the association’s Financial Year or such other time as permitted by law." },
      { type: "p", text: "The Committee determines the date, time and place of the AGM." },
      { type: "p", text: "The ordinary business of the AGM is to confirm the minutes of the previous AGM, receive and consider reports and statements on the previous Financial Year, and elect committee members." },
      { type: "p", text: "The AGM may also conduct any other business of which notice has been given in accordance with these rules." },
    ],
  },
  {
    number: "23",
    title: "Calling a Special General Meeting",
    blocks: [
      { type: "p", text: "The Committee must convene a Special General Meeting (SGM) if a request to do so is made in accordance with this rule by at least 10% of the total number of members." },
      { type: "p", text: "This request for a SGM must:" },
      { type: "ul", items: ["be in writing.", "state the business to be considered at the meeting and any resolutions to be proposed.", "include the names and signatures of the members requesting the meeting; and", "be given to the Secretary."] },
      { type: "p", text: "If the Committee does not convene a SGM within one month after the date on which the request is made, the members making the request (or any of them) may convene the special general meeting." },
      { type: "p", text: "A SGM convened by members must:" },
      { type: "ul", items: ["be held within three months after the date on which the original request was made; and", "only consider the business stated in that request."] },
      { type: "p", text: "The association must reimburse all reasonable expenses incurred by the members convening a SGM." },
      { type: "p", text: "Writing includes email and other correspondence in electronic form." },
    ],
  },
  {
    number: "24",
    title: "Notice of general meetings (including special resolutions)",
    blocks: [
      { type: "p", text: "Notice of the date, time and place of a general meeting must be provided to members at least 14 days (or 21 days if a special resolution is proposed) before the meeting in writing to each member’s postal or email address listed on the members register." },
      { type: "p", text: "Notices of general meetings must include all proposed matters to be dealt with at that meeting." },
      { type: "p", text: "If a special resolution is proposed, the notice must also include:" },
      { type: "ul", items: ["the full proposed resolution; and", "a statement of the intention to propose the resolution as a special resolution."] },
      { type: "p", text: "Writing includes email and other correspondence in electronic form." },
    ],
  },
  {
    number: "25",
    title: "General meetings procedure",
    blocks: [
      { type: "p", text: "As long as everyone can hear and communicate clearly at the same time, general meetings may be held at more than one place using technology (such as telephone or video conferencing)." },
      { type: "p", text: "The President is entitled to chair general meetings." },
      { type: "p", text: "If the President is not present, or does not wish to chair the meeting, the Deputy President is entitled to chair." },
      { type: "p", text: "If neither the President nor the Deputy President is present, or if neither wishes to chair the meeting, the meeting must elect another member to chair." },
      { type: "p", text: "The chair of the meeting does not have a casting vote." },
      { type: "p", text: "Votes must be held by a show of hands or written ballot, or another method determined by the chair that is fair and reasonable in the circumstances. If a vote is held initially by show of hands (or any other method determined by the chair), any member may request a vote be held again by written ballot. A ballot must be conducted in accordance with the procedure determined by the chair." },
      { type: "p", text: "A member not physically present at a general meeting may be permitted to participate in the meeting by the use of technology that allows that member and the members present at the meeting to clearly and simultaneously communicate with each other." },
      { type: "p", text: "For the purposes of this rule, a member participating in a general meeting through the use of technology as permitted under these rules is taken to be present at the meeting and, if the member votes at the meeting, is taken to have voted in person." },
      { type: "p", text: "Subject to the Act and these rules, each member has one vote on any question arising at the meeting." },
      { type: "p", text: "Decisions at a general meeting must be made by majority vote (subject to the provisions in these rules regarding special resolutions)." },
      { type: "p", text: "A special resolution is passed if at least 75% of the members voting at a general meeting vote in favour of the resolution." },
      { type: "p", text: "No business may be conducted at a general meeting unless a quorum is present." },
      { type: "p", text: "The chair may adjourn the meeting if a quorum is not reached within 30 minutes of the meeting start time, or if there is not enough time at a meeting to address all business. Notice of the date, time and place of the adjourned meeting must be sent to members as soon as practicable after the meeting. This notice does not have to comply with time for notice requirements, unless the adjourned meeting is more than 21 days after the original meeting date." },
      { type: "p", text: "No business may be conducted at an adjourned meeting, other than the business that remained unfinished when the meeting was adjourned." },
      { type: "p", text: "For a general meeting to be held, at least three of the members and 10% of the members (a quorum) must be present at the meeting (either in person or through the use of technology), for the meeting to be held." },
      { type: "p", text: "Members may vote by proxy at general meetings." },
      { type: "p", text: "Proxy forms must be received by the Secretary (in the form approved by the Committee, if any) 2 day(s) before a meeting." },
    ],
  },
  {
    number: "26",
    title: "Custody of documents and members’ access to documents",
    blocks: [
      { type: "p", text: "The Treasurer must keep custody of the financial records of the association for the current Financial Year and any other financial records as authorised by the Committee. The Secretary must keep custody of all books, documents and securities of the association (other than the financial records held by the Treasurer in accordance with these rules)." },
      { type: "p", text: "The Secretary must keep and maintain a register of members in accordance with the Act." },
      { type: "p", text: "A member is entitled to, subject to certain restrictions found in your rules, inspect the rules, general meeting minutes, relevant documents and the members register at a reasonable time. ‘Relevant documents’ includes documents such as financial records, contracts and asset records of the association." },
      { type: "p", text: "If a member asks to inspect the register of members, the association must allow this in a reasonable time. Note that, in certain circumstances, the association may withhold personal member information." },
      { type: "p", text: "A member can write to the Secretary asking for copies of these documents (with the exception of the members register). The association must provide copies of records of the association (other than the members' register) if a member requests copies in accordance with these rules (and unless the association is permitted to refuse the request in accordance with these rules). The association can charge a reasonable fee for providing copies." },
      { type: "p", text: "Subject to the Act, the association can refuse a request to inspect or get copies of relevant documents, or provide only limited access, if the documents contain confidential, personal, employment, commercial or legal matters, or if granting the request would breach a law or may cause damage or harm to the association." },
      { type: "p", text: "Subject to the Act, members cannot inspect or get copies of committee meeting minutes or parts of the minutes, unless the Committee specifically allows it." },
      { type: "p", text: "Members can write to the Secretary to ask that the Secretary restrict access to their details on the members register if they have special circumstances. The Secretary will decide if there are special circumstances, and must write to the member outlining their decision." },
      { type: "p", text: "Writing includes email and other correspondence in electronic form." },
    ],
  },
  {
    number: "27",
    title: "Disciplining members",
    blocks: [
      { type: "p", text: "The Committee can discipline a member of the association if it considers the member has breached these rules or if the member’s behaviour is causing (or has caused) damage or harm to the association." },
      { type: "p", text: "The Committee must write to the member to tell them why disciplinary action is proposed to be taken." },
      { type: "p", text: "The Committee must arrange a disciplinary procedure that meets these requirements:" },
      { type: "ul", items: ["the outcome must be determined by an unbiased decision-maker.", "the member must have the opportunity to be heard; and", "the disciplinary procedure must be completed as soon as reasonably practicable."] },
      { type: "p", text: "The outcome of a disciplinary procedure can be the temporary suspension or the expulsion of the member. The association cannot fine a member." },
      { type: "p", text: "Despite any other provision in these rules, a member whose membership has been suspended in accordance with the disciplinary procedure in these rules is not eligible to be elected or appointed as a committee member and is not entitled to vote at a general meeting." },
    ],
  },
  {
    number: "28",
    title: "Resolving disputes",
    blocks: [
      { type: "p", text: "If there is a dispute between a member and another member, a member and the association, or a member and the Committee, the parties involved must first attempt to resolve the dispute between themselves for at least 14 days from the date the dispute is known to all parties involved (Negotiation Period)." },
      { type: "p", text: "If the dispute can’t be resolved between the people involved within the Negotiation Period, the following grievance procedure must be followed:" },
      { type: "ul", items: ["the party with a grievance must, within 14 days after the Negotiation Period, write to the Committee and any other people affected, and explain their grievance (Grievance Notice).", "the Committee must, within 14 days after receipt of a Grievance Notice, appoint an unbiased mediator to hear from all the parties involved and try to find a solution.", "the Committee must give the people involved reasonable notice of the time and place of the mediation, which must be held as soon as practicable after the appointment of the mediator.", "at the mediation conference, each party must have an opportunity to be heard; and", "each party must do their best to resolve the dispute."] },
      { type: "p", text: "If the grievance procedure does not resolve the dispute, the parties may seek to resolve the dispute in accordance with the Act or otherwise at law." },
    ],
  },
  {
    number: "29",
    title: "Funds",
    blocks: [
      { type: "p", text: "The association may derive or generate funds from joining and annual subscription fees, donations, grants, fundraising, interest, and any other sources approved by the Committee." },
      { type: "p", text: "Cheques, EFT transfers or cash payments made from the association’s funds must be authorised by two committee members in writing." },
      { type: "p", text: "All other financial transactions (including credit card payments) must be authorised by two members of the Committee." },
      { type: "p", text: "Financial records must be kept and stored for seven years." },
    ],
  },
  {
    number: "30",
    title: "Common seal",
    blocks: [
      { type: "p", text: "The association does not have a common seal." },
    ],
  },
  {
    number: "31",
    title: "Changing the rules",
    blocks: [
      { type: "p", text: "Subject to the Act, these rules may be changed, added to, or replaced only by special resolution of the association’s members at a general meeting." },
    ],
  },
  {
    number: "32",
    title: "Winding up the association",
    blocks: [
      { type: "p", text: "The members may vote by special resolution at a general meeting to wind up the association or voluntarily cancel its registration." },
      { type: "p", text: "If the association is wound up or voluntarily cancelled, any surplus assets must not be distributed to the members or former members of the association unless the member or former member is an organisation which is described below." },
      { type: "p", text: "The surplus assets of an association are the assets of the association remaining after satisfaction of the debts and liabilities of the association and the costs, charges and expenses of the winding up or voluntary cancellation of the association." },
      { type: "p", text: "Subject to the Act, the Regulations, any other applicable law and any court order, if the association is wound up any surplus assets must be given or transferred to another fund, authority or institution which is in each case:" },
      { type: "ul", items: ["charitable at law.", "required to pursue charitable purposes similar to, or inclusive of, the purposes of the association.", "required to apply its income and assets in promoting its purposes.", "prohibited from making distributions to its members to at least the same extent as the association.", "endorsed as a deductible gift recipient within the meaning of theIncome Tax Assessment Act 1997 (Cth); and", "selected at or about the time by a special resolution of members."] },
    ],
  },
  {
    number: "32A",
    title: "Revocation of deductible gift recipient endorsement",
    blocks: [
      { type: "p", text: "Subject to the Act, the Regulations, any other applicable law and any court order, if the association’s endorsement as a deductible gift recipient is revoked (whether or not the association is to be wound up), any surplus:" },
      { type: "ul", items: ["gifts of money or property for the principal purpose of the association.", "contributions made in relation to an eligible fundraising event held for the principal purpose of the association; and", "money received by the association because of such gifts and contributions,"] },
      { type: "p", text: "held at the time of the revocation must be given or transferred to another fund, authority or institution, which meets all the requirements listed under rule 32." },
    ],
  },
  {
    number: "33",
    title: "Notices",
    blocks: [
      { type: "p", text: "Members must give the association their address for notices, and any change in that address." },
      { type: "p", text: "The address for notices may include an email address." },
      { type: "p", text: "The association must enter any change in the address of a member in the register of members without delay." },
      { type: "p", text: "Notice may be given to a member by sending it to the address last given by the member." },
      { type: "p", text: "Notice may be given to the association or the Committee by sending the notice by post to the registered address, or, if the Committee determines that it is appropriate in the circumstances, by email to the email address of the association or the Secretary." },
      { type: "p", text: "In these rules a period of notice of a meeting expressed in days does not include:" },
      { type: "ul", items: ["the day on which notice is given; or", "the day on which the meeting is held."] },
      { type: "p", text: "Notices sent by post are taken to have been given on the 4th day after posting that is not a Saturday, Sunday or public holiday at that address." },
      { type: "p", text: "Notices sent by email are taken to have been given on the first day after sending that is not a Saturday, Sunday or public holiday at that address." },
      { type: "p", text: "In this rule, ’member’ includes a committee member." },
      { type: "p", text: "Produced on 16/2/2026." },
    ],
  },
];

export default function GoverningRulesPage() {
  return (
    <>
      <header style={{ background: "#192821", padding: "72px 28px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link href="/governance" style={{ display: "inline-block", marginBottom: 24, color: "#87988A", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← Governance &amp; Policies
          </Link>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>Governing document</p>
          <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4.6vw, 50px)", lineHeight: 1.1, color: "#F4F1EA" }}>Rules of The Wandering Man Inc.</h1>
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#CBD5CB", maxWidth: "62ch" }}>
            Incorporated under the Associations Incorporation Reform Act 2012 (Vic). These are the rules as lodged with Consumer Affairs Victoria - the same document that governs how the committee, members and general meetings operate.
          </p>
        </div>
      </header>

      <section style={{ background: "#F4F1EA", padding: "64px 28px 92px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          {sections.map((s) => (
            <div key={s.number} id={`rule-${s.number}`} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 14, padding: "28px 32px", scrollMarginTop: 80 }}>
              <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.3, color: "#24352B" }}>
                <span style={{ color: "#79A886", marginRight: 10 }}>{s.number}</span>
                {s.title}
              </h2>
              {s.blocks.map((b, idx) =>
                b.type === "p" ? (
                  <p key={idx} style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.65, color: "#46534A" }}>
                    {b.text}
                  </p>
                ) : (
                  <ul key={idx} style={{ margin: "0 0 12px", paddingLeft: 22, display: "flex", flexDirection: "column", gap: 6 }}>
                    {b.items?.map((it, i2) => (
                      <li key={i2} style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.6, color: "#46534A" }}>
                        {it}
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
          ))}

          <div style={{ background: "#E6DECC", borderRadius: 14, padding: "26px 30px" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 16, lineHeight: 1.6, color: "#5C4F3A" }}>
              Questions about these rules, or want a signed copy of what was lodged with Consumer Affairs Victoria? Email{" "}
              <a href="mailto:hello@thewanderingman.com.au?subject=Rules of association" style={{ color: "#3C6349", fontWeight: 600 }}>
                hello@thewanderingman.com.au
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
