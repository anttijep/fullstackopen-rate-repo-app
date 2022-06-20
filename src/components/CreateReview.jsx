import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from "yup";
import { StyleSheet, View } from "react-native";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";
import Button from "./Button";

const initialValues = {
  repositoryName: "",
  ownerName: "",
  rating: "",
  text: "",
};
const styles = StyleSheet.create({
  container: {
    ...theme.inputContainer,
    backgroundColor: theme.colors.defaultBackground,
  },
  multilineInput: {
    maxHeight: 100,
  },
});

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required("Repository name is required"),
  ownerName: yup.string().required("Owner name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .integer()
    .min(0, "Between 0 and 100")
    .max(100, "Between 0 and 100"),
});

const ReviewContainer = ({ onSubmit }) => {
  const handleRatingInput = (value, callback) => {
    if (!value) {
      callback("");
      return;
    }
    const number = parseInt(value, 10);
    if (!isNaN(number) && 0 <= number && number <= 100) {
      callback(number.toString());
    }
  };
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            autoCapitalize="none"
            placeholder="Repository owner name"
            name="ownerName"
          />
          <FormikTextInput
            autoCapitalize="none"
            placeholder="Repository name"
            name="repositoryName"
          />
          <FormikTextInput
            placeholder="Rating between 0 and 100"
            name="rating"
            keyboardType="numeric"
            onChangeText={(value) =>
              handleRatingInput(value, handleChange("rating"))
            }
          />
          <FormikTextInput
            autoCapitalize="none"
            placeholder="Review"
            name="text"
            multiline
            style={styles.multilineInput}
          />
          <Button text="Create a review" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const review = {...values, rating: parseInt(values.rating)};
      const res = await createReview(review);
      navigate(`/repo/${res.repositoryId}`)
    } catch (ex) {
      console.log(ex.message);
    }
  };
  return <ReviewContainer onSubmit={handleSubmit} />;
};

export default CreateReview;
