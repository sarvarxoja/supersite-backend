import { Lids } from "./lids/lids.model.js";
import { News } from "./news/news.model.js";

import { Admin } from "./admin/admin.model.js";
import { Courses } from "./course/course.model.js";
import { Questions } from "./questions/questions.model.js";

News.sync();
Lids.sync();
Admin.sync();
Courses.sync();
Questions.sync();

export { Admin, Courses, News, Lids, Questions };
