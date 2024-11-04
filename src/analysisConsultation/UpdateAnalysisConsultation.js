
import {
    Button,
    Container,
    FormControl,
    Grid,
    makeStyles,
    React,
    TextField,
    Typography,
    useEffect,
    useHistory,
    useState
} from "../component"
import {doCompleteAnalysisConsultation} from "./analysisConsultationDispatcher";
import {appNotification} from "../shared/notification/app-notification";
import {useLocation, useRouteMatch} from "react-router-dom";
import {useDispatch} from "react-redux";
import {doGetTestRequestByID} from "../testrequests/testRequestDispatcher";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TestRequestDetail from "../testrequests/TestRequestDetail";
import LabResultDetail from "../testrequests/LabResultDetail";
import {errorHandler} from "../shared/common-helpers";


const useStyles = makeStyles((theme) => ({
    paperWhite: {
        margin: "0 auto",
        padding: "20px 20px 20px 20px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'white',
    },
    mt40:{
        marginTop:120,
    },
    w100:{
        width: '100%',
    },
    select100Form:{
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    formContainer:{
        padding:"50 50 50 50"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function UpdateAnalysisConsultation() {

    const classes = useStyles();

    const history = useHistory();

    let {params} = useRouteMatch("/update-analysisConsultation/:id");

    const {id} =params

    const [testRequest, setTestRequest] = useState(null);
    const [labResult, setLabResult] = useState(null);
    const [  suggestion , setSuggestion] = useState('NO_ISSUES');
    const [comments, setComments] = useState('');

    const [pdfFile, setPdfFile] = useState(null);







    function handleSubmit(event) {




        event.preventDefault();
        const payload = {
            suggestion,
            comments,
            pdfFile,

        }

        console.log("payload",payload)
        doCompleteAnalysisConsultation(id,payload)
            .subscribe((response) => {
                appNotification.showSuccess("Succesfully Updated AnalysisConsultation")
               history.push("/analysisConsultation-history")

            }, errorHandler)

    }



    useEffect(() => {


        doGetTestRequestByID(id)
            .subscribe((result) => {
                setTestRequest(result)
                setLabResult(result.labResult)


            },errorHandler)





    }, [])






    return (
        <React.Fragment>
            <Container component="main" className={classes.mt40}>


                <Grid container spacing={2}  className={classes.paperWhite} >

                    <Typography component="h1" variant="h5">
                        Analysis
                        <hr />
                    </Typography>
                    <Grid container spacing={2}  className={classes.formContainer} >

                        <Grid item xs={6} >
                            <TestRequestDetail testRequest={testRequest}></TestRequestDetail>

                            <br/>
                            <LabResultDetail labResult={labResult}></LabResultDetail>

                        </Grid>
                        <Grid item xs={6} >
                            <form className={classes.form} onSubmit={handleSubmit} noValidate>

                            
                                  

                                <Grid container spacing={2}>

                                <Grid item xs={12}>
                                       <input
                                       type="file"
                                       accept=".pdf"
                                       onChange={(e) => setPdfFile(e.target.files[0])}
                                       />
                                    </Grid>
                                



                                    <Grid item xs={12} >


                                        <FormControl variant="outlined" className={classes.select100Form}>
                                            <InputLabel htmlFor="outlined-result-native-simple">Suggestion</InputLabel>
                                            <Select
                                                native
                                                value={suggestion}
                                                onChange={e => setSuggestion(e.target.value)}
                                                label="Suggestion"
                                                className={classes.select100}
                                                inputProps={{
                                                    name: 'suggestion',
                                                    id: 'suggestionSelect',
                                                }}
                                            >
                                                <option value="NO_ISSUES">No Issues</option>
                                                <option value="HOME_QUARANTINE">Quarantine in Home</option>
                                                <option value="ADMIT">Admit in hospital</option>
                                            </Select>
                                        </FormControl>




                                    </Grid>



                                    <Grid item xs={12}>

                                        <TextareaAutosize
                                            className={classes.w100}
                                            aria-label="comments"
                                            rowsMin={3}
                                            value={comments}
                                            name="comments"
                                            label="comments"

                                            id="comments"
                                            onInput={e => setComments(e.target.value)}
                                            placeholder="Comments" />

                                    </Grid>



                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Update LabConsultation
                                </Button>

                            </form>

                        </Grid>
                    </Grid>


                </Grid>

            </Container>
        </React.Fragment>

    )
                                            }

export default UpdateAnalysisConsultation;
