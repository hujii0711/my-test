import bcrypt from "bcryptjs";
import passport from "passport";
import passportLocal from "passport-local";
import { Users } from "../../models/users";
const LocalStrategy = passportLocal.Strategy;

const localStrategy = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "identifier", //req.body.identifier
        passwordField: "password", //req.body.password
      },
      async (identifier, password, done) => {
        try {
          const exUser = await Users.findOne({ where: { user_id: identifier } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};

export default localStrategy;
