/**
 * Speaker content supplied by the organizers.
 *
 * Editorial changes to submitted text, all minimal: contact details removed (Baer);
 * credential string garbled in the source dropped from the first sentence (Baer);
 * missing full stops added (Garner, Moran); long bios split into paragraphs.
 * Fennell's bio is written from his CV (no bio was supplied).
 */

export interface Speaker {
  id: string;
  name: string;
  title?: string;
  organization?: string;
  /** Short label such as "Moderator". */
  role?: string;
  /** Course ids; see `speakerGroups`. */
  groups?: readonly string[];
  /** Public path to a headshot, or null for the initials fallback. */
  headshot: string | null;
  /** CSS object-position for cropping the 4:5 portrait. Defaults to centre. */
  headshotPosition?: string;
  /** Paragraphs. Empty when no biography has been supplied. */
  bio: string[];
  /** Shown above the course tabs and also in any assigned courses. */
  featured?: boolean;
  /** Label for the featured strip, e.g. "Opening Remarks". */
  featuredLabel?: string;
}

export interface SpeakerGroup {
  id: string;
  /** Tab label. */
  label: string;
  /** Full title shown above the speakers in the active tab. */
  title?: string;
}

/**
 * Courses, in tab order. Speakers without `groups` are not listed in any tab;
 * featured speakers also appear above the tabs. Titles as supplied.
 */
export const speakerGroups: readonly SpeakerGroup[] = [
  {
    id: "ai",
    label: "Algorithmic Response",
    title: "Algorithmic Response: Governing Artificial Intelligence and Emerging Technologies in Emergencies",
  },
  {
    id: "rights-equity",
    label: "Justice Under Pressure",
    title: "Justice Under Pressure: Protecting Rights and Advancing Equity During Disasters",
  },
  {
    id: "continuity",
    label: "When the Firm Goes Dark",
    title: "Ethical Duties When the Office Goes Dark: Continuity of Operations and Client Protection During Disasters",
  },
  {
    id: "cascading-risks",
    label: "Climate Change, The Next Disaster Landscape",
    title: "Climate Change, The Next Disaster Landscape: Legal Preparedness for Cascading and Complex Risks",
  },
];

export const speakers: readonly Speaker[] = [
  {
    id: "christina-farrell",
    name: "Christina Farrell",
    title: "Commissioner",
    organization: "New York City Emergency Management",
    headshot: "/assets/headshots/christina-farrell.jpg",
    featured: true,
    featuredLabel: "Opening Remarks",
    bio: [
      "Christina Farrell is a lifelong public servant with more than 23 years of experience working to improve the lives of New Yorkers before, during, and after emergencies. As First Deputy Commissioner of the New York City Emergency Management Department (NYCEM), she helped to lead the City’s emergency preparedness, response, and recovery efforts and collaborated with City leadership and regional, state, and federal partners on emergency management matters. Farrell has served in senior leadership roles during some of the most complex crises of the past two decades, coordinating emergency operations during the citywide blackout of 2003, Hurricane Sandy, blizzards, the COVID-19 pandemic, power outages, transportation disruptions, extreme heat, steam pipe explosions, building collapses, significant fires, and other emergencies. Since 2021, Farrell has set the strategic direction for emergency management and prioritized employee engagement, wellness, and retention and equity, diversity, and inclusion efforts for more than 300 staff.",
      "Farrell joined NYCEM in 2003 as the department’s first director of grants. She created the department’s external affairs division, first serving as the assistant commissioner of the division and then as deputy commissioner. During her tenure in external affairs, she oversaw programs including Community Emergency Response Teams and Ready NY, created initiatives to educate the public, and enhanced partnerships with elected officials, community organizations, neighborhood leaders, and private and non-profit sector partners.",
      "Farrell began serving the City of New York in 1994 as a coordinator in the Mayor’s Office of the Criminal Justice Coordinator. She also served as the deputy director of the NYC High Intensity Drug Trafficking Area and the deputy director and director of the Mayor’s Office of Grants Administration, where she worked on the creation of the Twin Towers Fund after 9/11.",
      "Farrell holds a bachelor’s degree in international relations and economics from Colgate University and a Master of Public Administration from the University of North Carolina at Chapel Hill. She is also a graduate of the executive leaders program at the Naval Postgraduate School in Monterey, California.",
    ],
  },
  {
    id: "karol-mason",
    name: "Karol Mason",
    title: "President",
    organization: "John Jay College",
    headshot: null,
    featured: true,
    featuredLabel: "Opening Remarks",
    bio: [],
  },
  {
    id: "taa-grays",
    name: "Taa Grays",
    title: "President",
    organization: "New York State Bar Association",
    groups: ["rights-equity"],
    headshot: "/assets/headshots/taa-grays.jpg",
    featured: true,
    featuredLabel: "Opening Remarks",
    bio: [
      "Taa Grays currently serves as President of the New York State Bar Association, marking both the tenth woman and the first Black woman to hold this office in the association’s 150-year history. During her tenure, Grays will focus on implementing the association’s strategic plan. In addition, Grays will focus on simplifying consumer terms and conditions, improving access to justice in Family Court, providing guidance concerning renewable and sustainable energy use, building more member resources on the use of generative artificial intelligence, and developing an archive showcasing the accomplishment of the association and its members in advancing the rule of law. She also remains committed to mitigating the impact of legal deserts across the state through the Rural Ready initiative.",
      "Grays has dedicated over two decades of service to the New York State Bar Association, contributing to areas including police reform, strategic planning, and corporate governance. Her extensive leadership experience provides a strong foundation for her current role. She has co-chaired several committees and task forces, including the Strategic Planning Committee, the Task Force on Racism, Social Equity and the Law, and the Task Force on Racial Injustice and Police Reform. Grays is an active member of the Business Law, Corporate Counsel, and Women in Law sections. Additionally, she has served as vice president of the First Judicial District on the Executive Committee and chaired both the New York State Conference of Bar Leaders and the Committee on Women in the Law (now the Women in Law Section).",
      "Previously, Grays was vice president and associate general counsel of information governance at MetLife, leading its global Information Governance Program and overseeing a team tasked with developing and executing strategic plans in this area. Her career began with MetLife in 2003, initially in the litigation section, followed by a role as chief of staff to the general counsel from 2010 to 2015. Before joining MetLife, she served as assistant district attorney in the Bronx District Attorney’s Office within the rackets bureau for five and a half years.",
      "Grays has received numerous accolades, including the New York State Bar Association’s Diversity Trailblazer Award in 2008. She was named one of Crain’s New York Business’s 100 Leading Women Lawyers in New York in 2017, recognized as a Visionary Leader in Litigation by Inside Counsel in 2016, included among the Most Influential Black Lawyers in 2015, and listed as Ready to Rise for general counsel roles in 2013 and 2015. In the broader legal community, the New York City Bar Association honored Grays as a Diversity Champion in 2015, while the Metropolitan Black Bar Association presented her with its inaugural Bar Leaders of the Year Award in 2010 for her dedication and leadership.",
      "Grays holds a Juris Doctor from Georgetown University Law Center and a Bachelor of Arts from Harvard University.",
    ],
  },
  {
    id: "nisha-agarwal",
    name: "Nisha Agarwal",
    title: "Commissioner",
    organization: "Mayor’s Office for People with Disabilities",
    headshot: "/assets/headshots/nisha-agarwal.jpg",
    featured: true,
    featuredLabel: "Opening Remarks",
    bio: [
      "Commissioner Nisha Agarwal currently serves as Commissioner of the Mayor’s Office for People with Disabilities, where she works to advance accessibility, equity, and inclusion for New Yorkers with disabilities. Throughout her career in public service, advocacy, and law, Commissioner Agarwal has focused on expanding access and opportunity across communities, with leadership roles spanning public health, immigrant justice, and civic engagement. Prior to joining MOPD, she served in several senior city government roles, including leading the Mayor’s Office of Immigrant Affairs, where she helped advance initiatives such as IDNYC. She brings a longstanding commitment to ensuring government is more responsive, inclusive, and accessible for all New Yorkers.",
    ],
  },
  {
    id: "steve-banks",
    name: "Steve Banks",
    title: "Corporation Counsel",
    headshot: "/assets/headshots/steve-banks.jpg",
    featured: true,
    featuredLabel: "Opening Remarks",
    bio: [],
  },
  {
    id: "jeh-johnson",
    name: "Jeh Johnson",
    title: "Former Secretary of the Department of Homeland Security",
    headshot: null,
    featured: true,
    featuredLabel: "Keynote",
    bio: [],
  },
  {
    id: "patria-frias-colon",
    name: "Justice Patria Frias-Colón",
    title: "Justice of the Supreme Court, Civil Term, Kings County",
    groups: ["ai", "continuity"],
    headshot: "/assets/headshots/patria-frias-colon.jpg",
    bio: [
      "The Hon. Patria Frias-Colón was elected in 2022 as Justice of the Supreme Court, Civil Term of Kings County where she currently serves in the Medical Malpractice Part. Before this, she was the Supervising Judge for the Civil Court in Queens County and served in both the Civil Court of Kings County and Family Court of New York County.",
      "She is dedicated to improving the state court system, holding leadership roles such as co-chair of the Court Modernization Action Committee and serving on the Advisory Committee on Artificial Intelligence and the Courts.",
      "Prior to her judicial career, she was Brooklyn Borough Chief at the NYC Law Department’s Family Court Division and Assistant Deputy Counsel to the Chancellor at the NYC Department of Education’s Office of Legal Services. Justice Frias-Colón began her legal career as an Assistant District Attorney at the Kings County District Attorney’s Office. She also taught as an Adjunct Professor at St. John’s University School of Education.",
      "Justice Frias-Colón holds a bachelor’s degree in Political Science with a minor in African American Studies from the University of Rochester and a Juris Doctor from Hofstra University School of Law.",
      "A proud Dominican-American born in the Dominican Republic, she lives by the mantra “to whom much is given, much is required” and strives to be both a good human and a just leader. She and her husband are parents to three successful adults who share pride in their heritage.",
    ],
  },
  {
    id: "marissa-moran",
    name: "Marissa J. Moran",
    title: "Professor and Chair, Law and Paralegal Studies Department",
    organization: "New York City College of Technology, CUNY",
    groups: ["ai"],
    headshot: "/assets/headshots/marissa-moran.jpg",
    bio: [
      "Marissa J. Moran is an attorney admitted to practice before the U.S. Supreme Court, New York State, New Jersey, and the United States District Courts. She received her B.A. in Economics from Fordham University and her law degree from Brooklyn Law School. While in law school she interned at the U.S. Attorney’s Office, Southern District of New York, and upon graduation, clerked for U.S. Bankruptcy Chief Judge Burton R. Lifland in the Southern District of New York. She later worked as an associate at two New York law firms, Kaye, Scholer, Fierman, Hays & Handler and Emmet, Marvin & Martin.",
      "She is currently a professor and chair of the Law and Paralegal Studies Department, New York City College of Technology, City University of New York, where she has over 20 years of legal education experience creating and teaching courses such as Legal Technology, Forensic Science & The Legal Process, Legal Document Preparation, Legal Ethics and Professional Responsibility, and Theatre of Law. Marissa served as the college’s grievance counselor and chaired the Faculty Student Disciplinary Committee. She has also taught business law courses as an adjunct clinical professor at New York University, Stern School of Business.",
      "Marissa has written several articles for the Legal Educator, a publication of the American Association of Paralegal Educators, and has spoken at several New York State Bar Association CLEs and Paralegal Educator National and Local conferences on such topics as Legal Technology, Artificial Intelligence, Cybersecurity, and Forensic Science & Law. Her article on biometrics and facial recognition technology was featured as the cover article in the May/June 2023 New York State Bar Association (NYSBA) Journal.",
      "She has served as a judge for the American Bar Association (ABA) Law Student Division for the Client Counseling Competition, Dispute Resolution/Mediation Competition, Arbitration Competition, and the National Appellate Advocacy Competition, Cardozo Law School Monrad G. Paulsen Moot Court Competitions, the International Moot Court Honor Society, Oxford Competitions, BMI Entertainment and Media Moot Court Competitions, the Monroe Price Media Law Competitions, and the University of Missouri School of Law Client Counseling and Mediation Competitions, and the We the People High School Competitions; Mock Trial NYC High School Tournaments.",
      "Marissa was a member of the NYSBA Task Force on Artificial Intelligence, and is currently the Vice Chair of the NYSBA Committee on Artificial Intelligence and Emerging Technologies; the Vice Chair of the NYSBA Committee on Technology and the Legal Profession; and a member of the NYSBA Committee on Continuing Legal Education, NYSBA Committee on Committees on Committees, and the ABA International Law Section, Privacy, Cybersecurity and Digital Rights Committee.",
    ],
  },
  {
    id: "susan-garcia-nofi",
    name: "Susan Garcia Nofi",
    title: "Legal Director",
    organization: "TechTonic Justice",
    groups: ["ai"],
    headshot: "/assets/headshots/susan-garcia-nofi.jpg",
    bio: [
      "Susan Garcia Nofi is TechTonic Justice's Legal Director. She spent most of her career as a frontline legal aid attorney at Vermont Legal Aid, Central West Justice Center (MA) and New Haven Legal Assistance (CT), where she also served as Deputy Director and Executive Director. As an advocate, Susan has represented clients in housing, public benefits, employment, and disability rights matters. She also spent a decade working for the State of Connecticut Department of Labor as an Appeals Referee, as Board of Review legal staff, and most recently as Chair of the Board of Review and executive head of the appeals division.",
    ],
  },
  {
    id: "rebecca-lipman",
    name: "Rebecca Lipman",
    title: "Deputy Chief, Ethics and Compliance Division",
    organization: "New York City Law Department",
    groups: ["ai"],
    headshot: "/assets/headshots/rebecca-lipman.jpg",
    bio: [
      "Rebecca Lipman is the Deputy Chief of the Ethics and Compliance Division at the New York City Law Department. Rebecca joined the Legal Counsel Division of the Law Department in 2016 after clerking for the Honorable Anne E. Thompson in the District of New Jersey. Rebecca left the Law Department in 2021 to become the General Counsel for the Mayor's Office of Operations. In 2024, Rebecca moved to the Department of Sanitation, where she was the Assistant Commissioner for Legal Affairs. Rebecca is now thrilled to return back to the Law Department, which has some of the kindest and smartest lawyers in New York City. She is a graduate of Harvard Law School and is admitted to practice in the State of New York.",
    ],
  },
  {
    id: "alessandra-jerolleman",
    name: "Alessandra Jerolleman, PhD, JD, MPA, CFM",
    title: "Disaster Resilience and Adaptation Senior Fellow",
    organization: "Livelihoods Knowledge Exchange Network",
    groups: ["cascading-risks"],
    headshot: "/assets/headshots/alessandra-jerolleman.jpg",
    bio: [
      "Alessandra Jerolleman is the Disaster Resilience and Adaptation Senior Fellow at the Livelihoods Knowledge Exchange Network and is admitted to the Louisiana Bar. Dr. Jerolleman serves as the Part-Time Director of Research for the Center for Environment, Land and Law, at Loyola University New Orleans College of Law where she runs a Community Based Research Lab. She previously served as an Associate Professor and Director of the Doctoral Program in Emergency Management at Jacksonville State University. Dr. Jerolleman supported the U.S. Geological Survey’s National Climate Adaptation Science Centers as the National Climate Justice Lead from 2023-2025. She is a community resilience specialist and applied researcher at the Lowlander Center with expertise in disaster recovery, risk reduction, and hazard policy. She has published several books and articles including: The Relationship between Persons and Property: Implications for Climate Change and Resettlement. She has a long history of working with the public, private, and nonprofit sectors; as well as tribal nations. Her experience includes: independent research on disaster risk reduction and hazard mitigation; lead grant writer and emergency planner for the First Peoples’ Conservation Council; community based resilience planning across the United States; working with Save the Children USA following hurricanes and tornadoes, on a resilience initiative; hazard mitigation planning at the local, state and campus level; community education and outreach regarding mitigation measures and preparedness; development of collaborative networks among practitioners; and, delivery of training and education.",
    ],
  },
  {
    id: "hilary-meltzer",
    name: "Hilary Meltzer",
    title: "Chief, Environmental Law Division",
    organization: "New York City Law Department",
    groups: ["cascading-risks"],
    headshot: "/assets/headshots/hilary-meltzer.jpg",
    bio: [
      "Hilary Meltzer became Chief of the Environmental Law Division of the New York City Law Department in 2019 after serving as Deputy Chief for nine years and a member of that Division since 1992. She practices environmental and municipal law, focusing on a variety of infrastructure, land use, and policy issues facing New York City.",
      "Ms. Meltzer has worked on drinking water issues for over three decades, including serving as a lead in negotiations with State and federal regulators concerning the Filtration Avoidance Determinations for the City’s Catskill/Delaware Water Supply System, which supplies approximately 1.1 billion gallons a day of high quality, affordable drinking water to over nine million people. Her practice also encompasses environmental justice, including implementation of New York City’s 2017 environmental justice local laws; CERCLA, including the Gowanus Canal and Newtown Creek Superfund sites; the City’s wastewater and stormwater systems; and climate mitigation and resiliency.",
      "Ms. Meltzer received a JD from Yale Law School and a Bachelor’s degree with distinction in mathematics from Swarthmore College. She teaches a clinic, “Representing the City,” at New York University Law School.",
    ],
  },
  {
    id: "brian-baer",
    name: "Brian Baer",
    title: "Founder and Executive Director",
    organization: "The Elevated Studio",
    groups: ["cascading-risks"],
    headshot: "/assets/headshots/brian-baer.jpg",
    bio: [
      "Brian Baer is the founder and executive director for a nonprofit design, advocacy, management and education organization. The Elevated Studio promotes social equality by expanding access to values-driven design that helps individuals and communities achieve economic and physical resilience and sustainability. Brian is a licensed architect with four decades of experience implementing sustainable, community-aided design solutions for a wide variety of projects across the United States. Deftly combining versatile leadership, design, and managerial skills, Brian has collaborated with a wide variety of constituencies to bring consensus and success to the design and building process. Brian has been working across the country, using the skills necessary to support innovative long term recovery, mitigation and preparedness solutions to vulnerable households and communities affected by natural and man-made disasters. Over the course of his career, Brian has supported communities in recovery through federally declared, state-only declared, and low-attention incidents throughout the United States and its territories.",
      "Brian received his architecture degree from The Catholic University of America (B.S. Architecture & Urban Planning) in Washington D.C. He has practiced as an architect in Washington, D.C., Seattle, Boston and New York.",
      "Brian resides in the Mid-Hudson Valley of New York with family, two cats and a dog. When not working or spending time with his family, he can be found in one of many gardens, on a bicycle, or on the pitch as a referee or as a player for 2 over -the- hill men’s soccer teams.",
    ],
  },
  {
    id: "timothy-fennell",
    name: "Timothy J. Fennell, Esq.",
    title: "Managing Partner",
    organization: "Amdursky, Pelky, Fennell & Wallen, P.C.",
    groups: ["cascading-risks"],
    headshot: "/assets/headshots/timothy-fennell.jpg",
    bio: [
      "Timothy J. Fennell is Managing Partner of Amdursky, Pelky, Fennell & Wallen, P.C. in Oswego, New York. A graduate of Albany Law School, Union University (J.D., 1983) and LeMoyne College (B.A., political science, cum laude), he joined the firm in 1983 and became a partner in 1987. He is admitted to the New York State and federal courts and practices civil and criminal law, with emphasis on litigation, trusts and estates, matrimonial law, and real estate. He has presented cases to the Court of Appeals and the United States Supreme Court.",
      "Active in the New York State Bar Association for decades, he has served on its Executive Committee, chaired its Torts, Insurance and Compensation Law Section in 2018, and has been a member of its Committee on Mass Disaster Response since 2011. He is a past president of the Oswego County Bar Association and, in 2008, wrote “Do you have a continuity of operations plan?” for ABA Dialogue.",
    ],
  },
  {
    id: "clay-garner",
    name: "Clay Garner",
    title: "Director of Continuity and Mission Assurance",
    organization: "New York City Emergency Management",
    groups: ["continuity"],
    headshot: "/assets/headshots/clay-garner.jpg",
    bio: [
      "Clay Garner serves as Director of Continuity and Mission Assurance at New York City Emergency Management. He leads citywide continuity and preparedness initiatives, with a focus on strengthening the resilience of essential services and improving readiness for disruptions. Garner also supports NYCEM’s emergency operations during major incidents and planned events as a Planning Section Chief. Before joining the City of New York, Garner served as Chief Innovation Officer and Deputy Chief of Staff to the Mayor of San Jose, California. He led the Mayor’s Office of Technology and Innovation, advancing cross-departmental initiatives in public safety, digital services, transportation, privacy and data governance, digital inclusion, and emerging technology. He also supported the City’s response and resident service delivery during the COVID-19 pandemic. Earlier in his career, Garner worked at Google as an Associate Product Marketing Manager. He holds a B.A. from Stanford University with Honors and Distinction and was a Schwarzman Scholar at Tsinghua University, where he received a Master of Global Affairs. He is fluent in Spanish, Chinese, and Portuguese and a former volunteer Emergency Medical Technician in New York City’s 911 system.",
    ],
  },
  {
    id: "seth-rosner",
    name: "Seth M. Rosner",
    title: "Principal",
    organization: "Seth M. Rosner, P.C.",
    groups: ["continuity"],
    headshot: "/assets/headshots/seth-rosner.jpg",
    headshotPosition: "50% 10%",
    bio: [
      "Seth M. Rosner opened his solo practice in 2005, representing clients with personal injury matters and defending business owners involved in legal disputes. Because he has worked on all sides of business, personal injury, and insurance matters, Seth knows how insurance companies and defense counsel will approach a case. This experience gives him an advantageous, no-nonsense approach to each claim.",
      "For victims of personal injury cases, Seth’s objective is to bring closure and some measure of financial security. Similarly, Seth strives to protect entrepreneurs’ businesses from unnecessary risk, and to enforce agreements so that parties are held to what they promised to do. In addition, Seth has successfully resolved cases against insurance companies for failing to honor their obligations under an insurance policy or when an insurance company places their interests above those of their policyholders.",
      "Seth takes pride in learning about his clients, their lives and their businesses, both to better serve them legally, and to help put them at ease in the often-difficult experience of pursuing a lawsuit.",
      "He also gives back to the community and was recognized for his pro-bono work helping victims devastated by Superstorm Sandy. As a guest speaker, Seth lectures on topics to help individuals and businesses avoid costly litigation and mitigate risk.",
      "Seth is active in the legal community; he is an active member of the NYSBA Trial Lawyers’ Section Executive Committee, currently serving as Chair; a member of the NYSBA Committee on Mass Disaster Response and a member of the New York State Academy of Trial Lawyers. He is a past member of the American Bar Association, the American Association of Justice (AAJ). and of the Nassau County Bar Association.",
      "Seth was admitted to the practice of law before the New York State Courts in April 1997, the Federal Courts of the Eastern and Southern Districts of New York in 1998, and the Second Circuit Court of Appeals in 2008. He received his J.D. in June 1996 from St. John’s Law School. He is a graduate of the State University of New York at Albany, where he received a B. A. in Criminal Justice in December 1992 and an M.A. in Criminal Justice in July 1993.",
    ],
  },
  {
    id: "dennis-boyd",
    name: "Dennis Boyd",
    title: "Executive Civil and Human Rights Counsel",
    organization: "New York City Emergency Management",
    role: "Moderator",
    groups: ["rights-equity"],
    headshot: "/assets/headshots/dennis-boyd.jpg",
    bio: [
      "Dennis Boyd grew up on the Upper West Side of Manhattan and went out of state for both college and law school. Returning to New York City in 1987, he worked for Legal Aid’s Criminal Appeals and Civil Divisions before starting a focus on disability rights in 1999. With this focus, he first worked for New York Lawyers for the Public Interest, a local disability Protection and Advocacy law firm. There he tried cases and developed policy on de-institutionalization, access to housing, voting, health care and public accommodations. This included enforcing compliance with the requirements of the federal Americans with Disabilities Act (ADA) and Sections 504 and 508 of the Rehabilitation Act, as well as with state and city human rights laws. He has also worked for an Independent Living Center and served as a consultant for the United Nations, developing reports on the UN Secretariat’s compliance with the Convention on the Rights of Persons with Disabilities (CRPD).",
      "Since 2015 Mr. Boyd has worked in the Office of Chief Counsel at New York City’s Department of Emergency Management (NYCEM). There he serves as Executive Civil and Human Rights Counsel, overseeing the agency’s Disability and Access and Functional Needs program, which works to make emergency planning, preparedness, response and recovery inclusive of the needs of people who tend to be most adversely impacted by large scale emergencies due to their immutable traits. This includes people with disabilities, the elderly, children, non-English speakers, the unhoused and other marginalized populations.",
    ],
  },
  {
    id: "jason-rivera",
    name: "Jason Rivera",
    title: "Professor and Chair, Department of Public Management",
    organization: "John Jay College of Criminal Justice",
    groups: ["rights-equity"],
    headshot: "/assets/headshots/jason-rivera.jpg",
    bio: [
      "Dr. Jason Rivera is Professor and Chair of the Department of Public Management at John Jay College of Criminal Justice. He is also the Chair of the Section on Emergency and Crisis Management within the American Society for Public Administration. Jason’s research focuses on the intersection of public administration, emergency management, and social equity. Over the last twenty years, he has worked in various disaster and national contexts helping to enhance the capacity of governments’ emergency management systems. Along these lines, he has contributed to the development of emergency and disaster management policies at the local and state-levels in the United States, and at the national-level within The Gambia and El Salvador. Samples of his work can be found in Public Administration Review, the International Journal of Disaster Risk Reduction, and State & Local Government Review to name a few.",
    ],
  },
  {
    id: "jennifer-mathis",
    name: "Jennifer Mathis",
    title: "Deputy Director",
    organization: "Bazelon Center for Mental Health Law",
    groups: ["rights-equity"],
    headshot: "/assets/headshots/jennifer-mathis.jpg",
    bio: [
      "Jennifer Mathis is Deputy Director of the Bazelon Center for Mental Health Law. She has worked at the Center since 1999 except for two periods of federal government service. Between December 2021 and January 2025, Jennifer served as a Deputy Assistant Attorney General in the Justice Department’s Civil Rights Division, supervising the disability rights work among other functions. Jennifer uses litigation as well as policy advocacy to promote equal opportunity for people with disabilities in all areas of life, including community living, health care, housing, employment, education, parental and family rights, voting, and other areas. She played a key role in coordinating strategy and briefing when the Olmstead case was heard by the Supreme Court. Jennifer served on the disability community negotiating team that worked with business community representatives to craft language that became the ADA Amendments Act and played a lead role in securing passage of the ADAAA. Between 2010 and 2011, Jennifer served as Special Assistant to Commissioner Chai Feldblum at the U.S. Equal Employment Opportunity Commission, helping to draft regulations implementing the ADA Amendments Act and the Genetic Information Non-discrimination Act.",
    ],
  },
  {
    id: "michael-wasser",
    name: "Michael Wasser",
    title: "Senior Counsel",
    organization: "New York City Law Department",
    groups: ["rights-equity"],
    headshot: "/assets/headshots/michael-wasser.jpg",
    bio: [
      "Michael J. Wasser, Esq. is Senior Counsel in the Tax and Bankruptcy Litigation Division of the New York City Law Department, where he has practiced for more than 25 years, focusing on real property tax litigation, title clearance in eminent domain matters, closings, and IT projects.",
      "A committed advocate for disability inclusion, Michael serves on his office’s Diversity, Equity, and Inclusion Committee and led the effort to make the office the first public law office to sign the American Bar Association’s Pledge for Change, advocating for attorneys with disabilities. He also serves as Vice President of the Board of Directors of the Brooklyn Center for Independence of the Disabled and on the Board of Directors of NMD United, and is a past recipient of the Muscular Dystrophy Association National Personal Achievement Award, an ABA Spotlight Attorney, and featured in several publications.",
      "During Hurricane Sandy, he experienced firsthand the particular challenges that a major disaster can create for people who rely on accessible infrastructure, power-dependent equipment, transportation, and essential support services. That lived experience, paired with 25+ years as a litigator, has shaped a pragmatic, solutions-oriented approach — as comfortable identifying a problem as rolling up his sleeves to fix it, whether through policy advocacy, institutional reform, or direct board leadership.",
      "Born with a severe form of Becker Muscular Dystrophy, Michael is functionally quadriplegic and uses a motorized wheelchair. He is a Phi Beta Kappa graduate of Brooklyn College (CUNY) and earned his J.D. from Brooklyn Law School.",
    ],
  },
  {
    id: "sonja-orgias",
    name: "Sonja Orgias, Esq.",
    title: "Chief Counsel",
    organization: "New York City Emergency Management",
    role: "Moderator",
    groups: ["continuity"],
    headshot: "/assets/headshots/sonja-orgias.jpg",
    headshotPosition: "40% 50%",
    bio: [
      "Sonja Orgias has served as the Chief Counsel of New York City Emergency Management since August 2022. Ms. Orgias joined the agency in 2015 as Director of Legal Affairs and was appointed to Deputy Chief Counsel in 2021 to oversee the expansion of the agency’s legal operations.",
      "In her role, Ms. Orgias oversees the Office of the Chief Counsel comprised of three units: Legal Affairs, Civil and Human Rights and Records Management. She also provides legal guidance to the Commissioner, First Deputy Commissioner, and other executives. As a native Brooklynite who is also a City employee, Ms. Orgias is attuned to the unique way that this city runs; the way that its agencies run; and, the expectations of the public. She has overseen emergency legal operations in response to numerous incidents in and outside of NYC, including drafting executive orders for extreme weather events, multiple city-to-city agreements with NYC and other municipalities, drafting emergency contracts valued at more than $600 million for the procurement of goods and services during the COVID-19 response, and licenses needed for City operations during other emergency crises. In addition, Ms. Orgias was instrumental in starting, and serving in a leadership role of, the inaugural Equity and Diversity Council at New York Emergency Management. Her work has facilitated discussions and raised issues related to diversity, equity, and inclusion, which are necessary components in addressing community needs during emergencies.",
      "Prior to joining New York City Emergency Management, Ms. Orgias served as an Administrative Law Judge with the New York City Environmental Control Board – OATH and Assistant Counsel with FDNY. She has a background in bankruptcy, immigration, administrative law, and alternative dispute resolution.",
      "Ms. Orgias received her Juris Doctor Degree from Hofstra University School of Law and her Bachelor’s Degree from Boston University and is a proud Stuyvesant High School alumna. She is a member of the New York State Bar Association Committee on Mass Disaster Response. Ms. Orgias is admitted to practice in the State of New York, the Eastern and Southern Districts of New York, and the Supreme Court of the United States.",
    ],
  },
  {
    id: "lucette-moran",
    name: "Lucette Moran",
    title: "Agency Counsel",
    organization: "New York City Emergency Management",
    role: "Moderator",
    groups: ["cascading-risks"],
    headshot: "/assets/headshots/lucette-moran.jpg",
    bio: [
      "Lucette Moran has served as Agency Counsel in the Office of the Chief Counsel for New York City Emergency Management (NYCEM) since November 2025. In her role, Moran conducts research and provides advice to executives and staff on strategic, legal, and policy issues. She engages in transactional work and advises on agency staff policy and conflicts of interest rules. In addition to her legal duties, Moran co-leads the Retention & Recruitment Committee for the agency’s Equity, Diversity, and Inclusion Council. And during emergencies, she serves as an Emergency Support Function Coordinator for Transportation, Utilities, and Infrastructure public and private sector partners.",
      "Prior to joining NYCEM, Moran served in the NYC Mayor’s Office of Immigrant Affairs as Associate Director of Policy & Programs and as a Policy Advisor. She also worked as an immigration defense attorney for people in U.S. federal immigration detention, with a focus on criminal-immigration and humanitarian matters. She holds a Juris Doctor from American University Washington College of Law and a Master of Arts in International Affairs from American University School of International Service. Moran is admitted to practice in the State of New York and the Western District of New York.",
    ],
  },
  {
    id: "traci-wheelwright",
    name: "Traci Wheelwright",
    title: "Deputy Chief Counsel",
    organization: "New York City Emergency Management",
    role: "Moderator",
    groups: ["ai"],
    headshot: "/assets/headshots/traci-wheelwright.jpg",
    bio: [
      "Traci Wheelwright serves as Deputy Chief Counsel at NYC Emergency Management, where she leads a team of attorneys and professionals in providing strategic legal guidance on emergency response, civil rights, privacy, and procurement law. With over two decades of legal experience, Traci has built a distinguished career across city, state, and federal agencies, including the NYC Department of Transportation, Amtrak, the Long Island Railroad, and Nassau County. Her expertise spans rulemaking, litigation, public contracting, and compliance.",
      "At NYCEM, she plays a critical role in shaping legal policy, managing document production and preservation efforts, and supporting the agency's emergency activations through legal research, contract development, and interagency coordination. Traci is also a passionate mentor and advocate for professional development, having created and led mentorship programs throughout her career. She holds a J.D. from Hofstra University School of Law and an LL.M. Certificate in Real Estate from New York Law School. Her commitment to public service is matched by her global perspective—she is an avid traveler and lifelong learner with a deep appreciation for language and culture.",
    ],
  },
  {
    id: "rob-devoogd",
    name: "Rob DeVoogd",
    title: "Senior Agency Counsel and FOIL Officer",
    organization: "New York City Emergency Management",
    role: "Moderator",
    groups: ["cascading-risks"],
    headshot: "/assets/headshots/rob-devoogd.jpg",
    bio: [
      "Rob DeVoogd is Senior Agency Counsel and FOIL officer at New York City Emergency Management. He has been with the agency for 8 years.",
    ],
  },
];
