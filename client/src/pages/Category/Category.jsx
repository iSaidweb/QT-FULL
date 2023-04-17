import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import style from "./category.module.css";
import logo from "../../assets/images/gerb.png";
import mahal from "./mahalla.json";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Category(props) {
  const [category, setCategory] = useState("mahallalar");
  // const count = 6;
  const [max, setMax] = useState(mahal);
  // const [olds, setOlds]=useState(count-6)
  // const [newS, setNews]=useState(count)
  // const [currentPage, setCurrentPage]=useState(1)

  const changeCateg = (c) => {
    console.log("C", c);
    setCategory(c);
  };
//   function plusPage (){
//     if(max.length>count-1){
//         setNews(newS+count)
//         setOlds(olds+count)
//         setCurrentPage(currentPage+1)
//         window.scrollTo({top:0, behavior: "smooth"})
//     }
// }
// function minusPage (){
//     if(olds !== 0){
//         setNews(newS-count)
//         setOlds(olds-count)
//         setCurrentPage(currentPage-1)
//         window.scrollTo({top:0, behavior: "smooth"})
//     }
// }
  return (
    <>
    {}
      <div className="row conter">
        <hr className={style.hr}></hr>
        <div className="container">
          <div className={style.category}>
            <ul className={style.categories}>
              {["mahallalar", "shifoxonalar", "maktablar", "MTM lar"].map(
                function (categ, i) {
                  return (
                    <li
                      className={
                        style.categ +
                        " " +
                        (category === categ ? style.activeCateg : "")
                      }
                      key={i}
                      onClick={() => changeCateg(categ)}
                    >
                      <div className={style.text}>{categ}</div>
                      <div className={style.arrow}>
                        <FaChevronRight />
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
            <div className={style.items}>
              {category === "mahallalar" && (
                <>
                  <div className={style.box}>
                    {max.map((maxs) => {
                      return(
                         <div className={style.timeline}>
                        <img className={style.logos} src={logo} alt="" />
                        <div className={style.timelineitem}>
                          <span className={style.date}>{maxs.mah}</span>
                          <p className={style.desc}>Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      )
                    })}
                    {/* {[mah].map((item, i) => (
                      <div className={style.timeline}>
                        <img className={style.logos} src={logo} alt="" />
                        <div className={style.timelineitem}>
                          <span className={style.date}>{mah.mah}{item}</span>
                          <p className={style.desc}>Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                    ))} */}
                  </div>
                </>
              )}
              {category === "shifoxonalar" && (
                <>
                  <div className={style.box}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                      <div className={style.timeline}>
                        <img className={style.logos} src={logo} alt="" />
                        <div className={style.timelineitem}>
                          <span className={style.date}>Shifoxonalar</span>
                          <p className={style.desc}>QVP {item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {category === "MTM lar" && (
                <>
                  <div className={style.box}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                      <div className={style.timeline}>
                        <img className={style.logos} src={logo} alt="" />
                        <div className={style.timelineitem}>
                          <span className={style.date}>MTM lar</span>
                          <p className={style.desc}>Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {category === "maktablar" && (
                <>
                  <div className={style.box}>
                    {Array.from({ length: 20 }).map((item, i) => (
                      <div className={style.timeline}>
                        <img className={style.logos} src={logo} alt="" />
                        <div className={style.timelineitem}>
                          <span className={style.date}>Maktab {i + 1}</span>
                          <p className={style.desc}>Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Category;
