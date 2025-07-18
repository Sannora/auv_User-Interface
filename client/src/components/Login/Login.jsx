import './Login.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock} from '@fortawesome/free-solid-svg-icons'

function Login(){

    return(

        <>
        
        <section className="section-login">
            <div className="login-left">
                <img src="" alt="Giriş Arayüzü Görseli" className="image-login" />
            </div>
            <div className="login-right">
                <FontAwesomeIcon icon={faLock} className='icon-login' />
                <p className="text-login">Kullanıcı Girişi</p>
                <form action="" className="form-login">
                    <input
                    placeholder='Kullanıcı Adı'
                    type="text"
                    className="input-login"
                    />
                    <input
                    placeholder='Şifre'
                    type="password"
                    className="input-login"
                    />
                    <button className="button-login">Giriş Yap</button>
                </form>
            </div>
        </section>
        
        </>

    )

}

export default Login;