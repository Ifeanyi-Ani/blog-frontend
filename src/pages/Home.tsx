import { Button, Stack } from "react-bootstrap";
import { SideBar } from "../components/SideBar";
import { useState } from "react";
import { connect } from "react-redux";
import { isLoggedin } from "../redux/user/user.action";
import { CardInfo } from "../components/CardInfo";
import theme from "../assets/theme.jpg";
import PostList from "../components/PostList";
import CreatePostContainer from "../components/CreatePostContainer";

const Home = function ({ hidden }) {
  const [toggle, setToggle] = useState<boolean>(false);
  function handleToggle(val: boolean) {
    setToggle(val);
  }
  return (
    <div className='d-flex justify-content-center gap-3 pt-3 homeHead'>
      <main className={`${toggle === true ? "gridView-w" : "listView-w"}`}>
        {console.log(hidden)}
        {hidden ? null : <CreatePostContainer />}
        <Stack direction='horizontal' gap={3}>
          <Button variant='outline' className='text-light'>
            Today
          </Button>
          <Button variant='outline' className='text-light'>
            Trending
          </Button>
          <Button variant='outline' className='text-light'>
            Staff Picks
          </Button>
          <Button variant='outline' className='text-light'>
            Answer Time
          </Button>
          <Button variant='outline' className='text-light'>
            More
          </Button>

          <div className='d-flex ms-auto gap-1 view-cnt'>
            <div>
              <i
                className={`bi bi-grid-1x2-fill ${
                  toggle === true ? "actv" : ""
                }`}
                role='button'
                onClick={() => handleToggle(true)}
              ></i>
            </div>
            <div>
              <i
                className={`bi bi-distribute-vertical ${
                  toggle === false ? "actv" : ""
                }`}
                onClick={() => handleToggle(false)}
                role='button'
              ></i>
            </div>
          </div>
        </Stack>
        <div
          className={`mansoryLayout ${
            toggle == true ? "gridView" : "listView"
          }`}
        >
          <PostList />
          {/* <div className='gridItem'>
            <Card>
              <Card.Header
                style={{
                  position: "relative",
                  borderBottom: "none",
                  paddingLeft: "55px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "30px",
                    transform: "translate(-50%, -50%)",
                    width: "35px",
                    height: "35px",
                  }}
                  role='button'
                >
                  <img
                    src={avater}
                    alt='avater'
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <span role='button'>todayontumblr </span>
                <span className='text-primary' role='button'>
                  follow
                </span>
                <div
                  role='button'
                  className='d-flex justify-content-center align-items-center fs-4'
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "2px",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  ...
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Title>Wednesday, June 21.</Card.Title>
                <Card.Img></Card.Img>
                <Card.Text>
                  Well, well, well. Well. Well, well. Well, well, well, well,
                  well, well, well, well, well, well, well, well, well. Well.
                  Weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeell. Well well. Well well
                  well well well. Well, well. Wait. Where are our manners? What
                  we mean to say, of course, is well-come! A warmest, heartiest
                  greetin' to you. We heard rumors of a bit of a kerfuffle, a
                  bit of squibblin'-squabblin', a bit of bother down at The Old
                  Mill. And by The Old Mill, of course, we mean those good folks
                  over at #reddit, a nearby settlement, who seem to be havin' a
                  bit of trouble with somethin' this that or other. Now, we's
                  the types to mind our own business—other
                  <div className='d-flex gap-1 flex-wrap'>
                    <span>#today on tumblr</span>
                    <span>#tubme</span>
                    <span>#today on tumblr</span>
                    <span>#tubme</span>
                  </div>
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ borderTop: "none" }} className='d-flex'>
                <div
                  className='border rounded-5 d-flex justify-content-center align-items-center p-2'
                  role='button'
                >
                  2,440 notes
                </div>
                <Stack
                  className='footer-img ms-auto gap-3'
                  direction='horizontal'
                >
                  <img src={shareLogo} alt='logo' role='button' />
                  <img src={reloadLogo} alt='logo' role='button' />
                  <img src={likeLogo} alt='logo' role='button' />
                </Stack>
              </Card.Footer>
            </Card>
          </div> */}
        </div>
      </main>
      <SideBar
        cardHeader='Radar'
        header='Sponsored'
        title='Advertisement'
        Src='https://s.adroll.com/a/BJT/E3Z/BJTE3ZIMHJDNZESA5VV3RM/BJTE3ZIMHJDNZESA5VV3RM.html?clickTag=http%3A%2F%2Fd.adroll.com%2Fclick%2F%3Fadroll_insertion_id%3D1ef3d82bcd7fb6e9e6da275defea468c%26adroll_height%3D600%26adroll_width%3D300%26site_url%3Dhttp%253A%2F%2Fwww.tumblr.com%26adroll_pixalate_click_url%3Dhttps%253A%2F%2Fadrta.com%2Fc%253Fclid%253Dar%2526paid%253Dar%2526avid%253DGB4GLHY4VNBLVGJH5J2AGF%2526caid%253DDEE2A74JMBA5BEM5UU8PRO%2526plid%253DBJTE3ZIMHJDNZESA5VV3RM%2526siteId%253Dtumblr.com%2526kv1%253D300x600%2526publisherId%253Dwordpress_174375630%2526kv2%253Dhttps%25253a%25252f%25252fwww.tumblr.com%25252f%2526kv3%253Dbc7335bc117182e14936c50d9d5aefe0%2526kv4%253D105.112.226.50%2526kv7%253DAQ%2526kv10%253D%255BISP%255D%2526kv11%253D7969512291824410582831846925495641257%2526kv18%253D%2526kv19%253D%255BDevice_ID%255D%2526kv24%253DDesktop%26adroll_ad_payload%3D__HIA-gBkwHFA9XIA9EAAY1TS2zjVBSNnc4IqFRER-rw2bBAFYs6ef47FdXImaRJ0zjNp0k_fCzb7zV149iu7TSFBeqI1cDMgo8ADSwYBAvYjliwbR8qBb8gIZYjJBALdrNgN3yEUzFoBnXBW7zFfefde8895_6YmqfxjLa4vKbVNwStUuY2L7fVWqHcaGlpPNPgNXmtUKw1K6V2rdraWFtW6s2VCTyTr6wW-c0lrVwp1DaLLVXsdPimdhFPsUDMsCyX4TgpI4InvqJe344iP5zPZiEK7L2M5fWzjuFC2-1mkel5vTC75QVoP3tpEPX10BsEFlowYOA5zuw40kfQHvQXfN9ioB36jvHyadgy-r5hd92F59VCc6Vanb-sanV1qVTTa6pWfPEBjG7DhUKxyKmyUNHyqpgvamK7PSZyCjNgN_AG_hh1Nt1_UGPA2bRnw6RKkgGiPTvpHqKwF3n-rAGtaKGrjk--5wyW6ubmYqtfiHY6PWd1e2e9AwSktUpK3q5JpU64_oruRfWwurQfBuEOWnMXBWl1e81iGZdrOBtlK9_bLZldZr_bMAtcva2Etj1suc0dJadxpV0JCYVmkVlXxIqpoub2TrDi7tX0tqmrtabs7DWWwZN4ppQXStXyhtCp5audUqUsVji1tKjgmbMHND9KUZ_-9Bx-zHQMq6eb3r7uB7aViLd4PE1_dnLt7pW3T-5cfy--eXj7-zt_TS4fvpAa3EADZojCiGHN-CqeGg6HmWjQN51gLH58A9MravzBCL7786PxR_iR-54-puNPpuOTG37gwYEV2Z4bf4Of5RCwEDRlxVB4XrQUi5VEnuMtaHKSJQDJyMmmbJhy_O3x-Yk3RxNGw4zjpLsP33rj6Avy68HN1-51FxM8zQGOBxzH6_mm2mrpIgDx3eOp9BX8UCIe9Fw9IvPvx7__kD6I_xhff74DMnKOUGlMmYSa_q_BCfUMThEqdz8PQl3CT7ldxjEcxnAcZmtfP3U6AySOZZBLKBU_PPQC6AcoDAnVOCIUxOnItwhlYyr53xvndPHTpiUnlE2LZWVW4RAr5HjJEgHMQdFAWyipfu2QUNfxxXs79uCss4T6DVOQ0Cl84d96OisLvCxKPCA0ldSh10epiV9uEXoDT4W7_qCr78k6J-osS-jNI0K_dGoBQvdH6S-5xwm9S85dJfSrmOka_b6h2_1ELR8Fybb5PoJzDMtmBGEOZERZYhVxjhEzIMdzhD7AkyADAOA5IOWS3F__D3r06Hbqgs2ALUEyt6AJJEmELGJ5Qn-H02Y4JBPVI3LuczyZ9BD6KLGM2yXnt89k-zfEDMjtfCUYqptjB_Vazw%26adroll_subnetwork%3Dr%26cpm%3D0.108%26adroll_network%3Db%26desturl%3Dhttps%253A%2F%2Fderiv.com%2Flanding%2Febooks%2Fforex%2F%253Futm_source%253Dadroll%2526utm_medium%253Dppc-display%2526utm_campaign%253D%255BADROLL%253ACAMPAIGN_NAME%255D%2526utm_campaign_id%253D%255BADROLL%253ACAMPAIGN_EID%255D%2526utm_adgroup_id%253D%255BADROLL%253AAD_GROUP_EID%255D%2526utm_ad_id%253D%255BADROLL%253AAD_EID%255D%2526signup_device%253D%255BADROLL%253ADEVICE_TYPE%255D%2526adct%253DgAAAAABkluIPF5R92Zt4QyOG8Npo2UsitZMr7ZuC12cQFF6fhT4xGd-Y2g_tBH9nvf_vaQljUORkubB_nLBtSmVvKG6Cc-ZBtDmRkVXNJdffu0-rEcptrh0hg1LEM2662OEVuD9OgbY5%26clickurl%3Dhttps%253A%2F%2Fs.pubmine.com%2Fclick4%2Feaf02e9e-12d7-4a43-a286-2da2bd58c0e6%2Fjh6wYOZqF09fGfXtgQ8OgcaWV2BKWt__R4kfnWUi-kiSMn2HE5IJfj_tA7f5t6KtUVV7m0-YSONPtfr5jNTBKcH3XWf6EFYxT89IC1-4JaWCxHn8OiOrOk0SPruMZP6KMS3msAXo0baXqds8YdJoacpCV-erSHiofk-GdQ9VQTyfGovFxgAMKIKeuA%2F%2F'
      >
        <CardInfo />
        <div
          className='mySecondaryb mt-3 d-flex gap-3 p-2 align-items-center'
          style={{ cursor: "pointer" }}
        >
          <div className='imgCon'>
            <img src={theme} alt='themeLogo' />
          </div>
          <div className='nameCon text-light'>Change palete</div>
        </div>
      </SideBar>
    </div>
  );
};
const mapDispatchToProps = ({ isLoggedin: { hidden } }) => ({
  hidden,
});
export default connect(mapDispatchToProps)(Home);
