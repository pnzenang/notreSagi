import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineNumbers } from "react-icons/md";
import { GoCheck } from "react-icons/go";
import { FcApproval } from "react-icons/fc";
import { useDashboardContext } from "../pages/DashboardLayout";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Member";
import MemberInfo from "./MemberInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import moment from "moment";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";

day.extend(advancedFormat);
dayjs.extend(relativeTime);

const Member = ({
  _id,
  associationName,
  associationCode,
  memberFirstName,
  lastAndMiddleName,
  delegateRecommendation,
  memberMatriculation,
  createdAt,
  memberStatus,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  const temps = dayjs(createdAt).add(90, "d").format("MMM Do, YYYY");
  const time = dayjs(Date.now());
  const tod = dayjs(createdAt.toString());
  const m = time.diff(tod, "days");
  const position = m <= 90 ? "pending" : memberMatriculation;

  const { user } = useDashboardContext();
  return (
    <Wrapper
      style={
        m >= 90
          ? { borderTop: "solid 5px #92e998" }
          : { borderTop: "solid 5px #f59e0b" }
      }
    >
      <header>
        <div className="main-icon">{associationCode}</div>
        <div className="info">
          <h5>
            {memberFirstName} {lastAndMiddleName}
          </h5>
          <p>{associationName}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <MemberInfo
            icon={<MdOutlineNumbers size={20} />}
            text={`Mat: ${position}`}
          />
          <MemberInfo
            icon={<FaCalendarAlt size={20} />}
            text={`created: ${date}`}
          />
          <MemberInfo icon={<GoCheck />} text={delegateRecommendation} />
          <MemberInfo
            icon={<FcApproval size={20} />}
            text={`Vested: ${temps}`}
          />
          <div className={`status ${memberStatus}`}>{memberStatus}</div>
          <div className="actions">
            <Link to={`../edit-member/${_id}`} className="btn edit-btn">
              {user.role === "admin" ? "Edit Status" : "Edit Recommendation"}
            </Link>
            {user.role === "admin" ? (
              <Form method="post" action={`../delete-member/${_id}`}>
                <button type="submit" className="btn delete-btn">
                  Delete
                </button>
              </Form>
            ) : null}
          </div>
        </div>

        {/* <footer className="actions">
          <Link to={`../edit-member/${_id}`} className="btn edit-btn">
            {user.role === "admin" ? "Edit Status" : "Edit Recommendation"}
          </Link>
          {user.role === "admin" ? (
            <Form method="post" action={`../delete-member/${_id}`}>
              <button type="submit" className="btn delete-btn">
                Delete
              </button>
            </Form>
          ) : null}
        </footer> */}
      </div>
    </Wrapper>
  );
};
export default Member;
