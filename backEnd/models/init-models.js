var DataTypes = require("sequelize").DataTypes;
var _academicoxcliente = require("./academicoxcliente");
var _audit_log_entries = require("./audit_log_entries");
var _ayudaxinamu = require("./ayudaxinamu");
var _bitacora = require("./bitacora");
var _buckets = require("./buckets");
var _canton = require("./canton");
var _cliente_servicio = require("./cliente_servicio");
var _clientexbitacora = require("./clientexbitacora");
var _contacto = require("./contacto");
var _donde_dormi = require("./donde_dormi");
var _droga = require("./droga");
var _drogaxcliente = require("./drogaxcliente");
var _estado_civil = require("./estado_civil");
var _flow_state = require("./flow_state");
var _genero = require("./genero");
var _grado_academico = require("./grado_academico");
var _identities = require("./identities");
var _info3meses = require("./info3meses");
var _informacion_inamu = require("./informacion_inamu");
var _instances = require("./instances");
var _instituciones_violencia = require("./instituciones_violencia");
var _instituxviolen = require("./instituxviolen");
var _key = require("./key");
var _messages = require("./messages");
var _mfa_amr_claims = require("./mfa_amr_claims");
var _mfa_challenges = require("./mfa_challenges");
var _mfa_factors = require("./mfa_factors");
var _migrations = require("./migrations");
var _objects = require("./objects");
var _one_time_tokens = require("./one_time_tokens");
var _pais = require("./pais");
var _pensionxcliente = require("./pensionxcliente");
var _provincia = require("./provincia");
var _razon_servicio = require("./razon_servicio");
var _razon_serxcliente = require("./razon_serxcliente");
var _refresh_tokens = require("./refresh_tokens");
var _s3_multipart_uploads = require("./s3_multipart_uploads");
var _s3_multipart_uploads_parts = require("./s3_multipart_uploads_parts");
var _saml_providers = require("./saml_providers");
var _saml_relay_states = require("./saml_relay_states");
var _schema_migrations = require("./schema_migrations");
var _schema_migrations = require("./schema_migrations");
var _secrets = require("./secrets");
var _sessions = require("./sessions");
var _sso_domains = require("./sso_domains");
var _sso_providers = require("./sso_providers");
var _subscription = require("./subscription");
var _tiempo_calle = require("./tiempo_calle");
var _tipo_id = require("./tipo_id");
var _tipo_pension = require("./tipo_pension");
var _tipo_violencia = require("./tipo_violencia");
var _tipos_ayuda = require("./tipos_ayuda");
var _users = require("./users");
var _usuario_sistema = require("./usuario_sistema");
var _violenciaxinamu = require("./violenciaxinamu");

function initModels(sequelize) {
  var academicoxcliente = _academicoxcliente(sequelize, DataTypes);
  var audit_log_entries = _audit_log_entries(sequelize, DataTypes);
  var ayudaxinamu = _ayudaxinamu(sequelize, DataTypes);
  var bitacora = _bitacora(sequelize, DataTypes);
  var buckets = _buckets(sequelize, DataTypes);
  var canton = _canton(sequelize, DataTypes);
  var cliente_servicio = _cliente_servicio(sequelize, DataTypes);
  var clientexbitacora = _clientexbitacora(sequelize, DataTypes);
  var contacto = _contacto(sequelize, DataTypes);
  var donde_dormi = _donde_dormi(sequelize, DataTypes);
  var droga = _droga(sequelize, DataTypes);
  var drogaxcliente = _drogaxcliente(sequelize, DataTypes);
  var estado_civil = _estado_civil(sequelize, DataTypes);
  var flow_state = _flow_state(sequelize, DataTypes);
  var genero = _genero(sequelize, DataTypes);
  var grado_academico = _grado_academico(sequelize, DataTypes);
  var identities = _identities(sequelize, DataTypes);
  var info3meses = _info3meses(sequelize, DataTypes);
  var informacion_inamu = _informacion_inamu(sequelize, DataTypes);
  var instances = _instances(sequelize, DataTypes);
  var instituciones_violencia = _instituciones_violencia(sequelize, DataTypes);
  var instituxviolen = _instituxviolen(sequelize, DataTypes);
  var key = _key(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var mfa_amr_claims = _mfa_amr_claims(sequelize, DataTypes);
  var mfa_challenges = _mfa_challenges(sequelize, DataTypes);
  var mfa_factors = _mfa_factors(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var objects = _objects(sequelize, DataTypes);
  var one_time_tokens = _one_time_tokens(sequelize, DataTypes);
  var pais = _pais(sequelize, DataTypes);
  var pensionxcliente = _pensionxcliente(sequelize, DataTypes);
  var provincia = _provincia(sequelize, DataTypes);
  var razon_servicio = _razon_servicio(sequelize, DataTypes);
  var razon_serxcliente = _razon_serxcliente(sequelize, DataTypes);
  var refresh_tokens = _refresh_tokens(sequelize, DataTypes);
  var s3_multipart_uploads = _s3_multipart_uploads(sequelize, DataTypes);
  var s3_multipart_uploads_parts = _s3_multipart_uploads_parts(sequelize, DataTypes);
  var saml_providers = _saml_providers(sequelize, DataTypes);
  var saml_relay_states = _saml_relay_states(sequelize, DataTypes);
  var schema_migrations = _schema_migrations(sequelize, DataTypes);
  var schema_migrations = _schema_migrations(sequelize, DataTypes);
  var secrets = _secrets(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var sso_domains = _sso_domains(sequelize, DataTypes);
  var sso_providers = _sso_providers(sequelize, DataTypes);
  var subscription = _subscription(sequelize, DataTypes);
  var tiempo_calle = _tiempo_calle(sequelize, DataTypes);
  var tipo_id = _tipo_id(sequelize, DataTypes);
  var tipo_pension = _tipo_pension(sequelize, DataTypes);
  var tipo_violencia = _tipo_violencia(sequelize, DataTypes);
  var tipos_ayuda = _tipos_ayuda(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var usuario_sistema = _usuario_sistema(sequelize, DataTypes);
  var violenciaxinamu = _violenciaxinamu(sequelize, DataTypes);

  bitacora.belongsToMany(cliente_servicio, { as: 'cliente_servicio_id_cliente_servicio_clientexbitacoras', through: clientexbitacora, foreignKey: "bitacora_id", otherKey: "cliente_servicio_id" });
  cliente_servicio.belongsToMany(bitacora, { as: 'bitacora_id_bitacoras', through: clientexbitacora, foreignKey: "cliente_servicio_id", otherKey: "bitacora_id" });
  cliente_servicio.belongsToMany(droga, { as: 'droga_id_drogas', through: drogaxcliente, foreignKey: "cliente_servicio_id", otherKey: "droga_id" });
  cliente_servicio.belongsToMany(grado_academico, { as: 'grado_academico_id_grado_academicos', through: academicoxcliente, foreignKey: "cliente_servicio_id", otherKey: "grado_academico_id" });
  cliente_servicio.belongsToMany(razon_servicio, { as: 'razon_servicio_id_razon_servicios', through: razon_serxcliente, foreignKey: "cliente_servicio_id", otherKey: "razon_servicio_id" });
  cliente_servicio.belongsToMany(tipo_pension, { as: 'tipo_pension_id_tipo_pensions', through: pensionxcliente, foreignKey: "cliente_servicio_id", otherKey: "tipo_pension_id" });
  droga.belongsToMany(cliente_servicio, { as: 'cliente_servicio_id_cliente_servicio_drogaxclientes', through: drogaxcliente, foreignKey: "droga_id", otherKey: "cliente_servicio_id" });
  grado_academico.belongsToMany(cliente_servicio, { as: 'cliente_servicio_id_cliente_servicios', through: academicoxcliente, foreignKey: "grado_academico_id", otherKey: "cliente_servicio_id" });
  informacion_inamu.belongsToMany(instituciones_violencia, { as: 'instituciones_violencia_id_instituciones_violencia', through: instituxviolen, foreignKey: "informacion_inamu_id", otherKey: "instituciones_violencia_id" });
  informacion_inamu.belongsToMany(tipo_violencia, { as: 'tipo_violencia_id_tipo_violencia', through: violenciaxinamu, foreignKey: "informacion_inamu_id", otherKey: "tipo_violencia_id" });
  informacion_inamu.belongsToMany(tipos_ayuda, { as: 'tipos_ayuda_id_tipos_ayudas', through: ayudaxinamu, foreignKey: "informacion_inamu_id", otherKey: "tipos_ayuda_id" });
  instituciones_violencia.belongsToMany(informacion_inamu, { as: 'informacion_inamu_id_informacion_inamu_instituxviolens', through: instituxviolen, foreignKey: "instituciones_violencia_id", otherKey: "informacion_inamu_id" });
  razon_servicio.belongsToMany(cliente_servicio, { as: 'cliente_servicio_id_cliente_servicio_razon_serxclientes', through: razon_serxcliente, foreignKey: "razon_servicio_id", otherKey: "cliente_servicio_id" });
  tipo_pension.belongsToMany(cliente_servicio, { as: 'cliente_servicio_id_cliente_servicio_pensionxclientes', through: pensionxcliente, foreignKey: "tipo_pension_id", otherKey: "cliente_servicio_id" });
  tipo_violencia.belongsToMany(informacion_inamu, { as: 'informacion_inamu_id_informacion_inamu_violenciaxinamus', through: violenciaxinamu, foreignKey: "tipo_violencia_id", otherKey: "informacion_inamu_id" });
  tipos_ayuda.belongsToMany(informacion_inamu, { as: 'informacion_inamu_id_informacion_inamus', through: ayudaxinamu, foreignKey: "tipos_ayuda_id", otherKey: "informacion_inamu_id" });
  saml_relay_states.belongsTo(flow_state, { as: "flow_state", foreignKey: "flow_state_id"});
  flow_state.hasMany(saml_relay_states, { as: "saml_relay_states", foreignKey: "flow_state_id"});
  mfa_challenges.belongsTo(mfa_factors, { as: "factor", foreignKey: "factor_id"});
  mfa_factors.hasMany(mfa_challenges, { as: "mfa_challenges", foreignKey: "factor_id"});
  mfa_amr_claims.belongsTo(sessions, { as: "session", foreignKey: "session_id"});
  sessions.hasMany(mfa_amr_claims, { as: "mfa_amr_claims", foreignKey: "session_id"});
  refresh_tokens.belongsTo(sessions, { as: "session", foreignKey: "session_id"});
  sessions.hasMany(refresh_tokens, { as: "refresh_tokens", foreignKey: "session_id"});
  saml_providers.belongsTo(sso_providers, { as: "sso_provider", foreignKey: "sso_provider_id"});
  sso_providers.hasMany(saml_providers, { as: "saml_providers", foreignKey: "sso_provider_id"});
  saml_relay_states.belongsTo(sso_providers, { as: "sso_provider", foreignKey: "sso_provider_id"});
  sso_providers.hasMany(saml_relay_states, { as: "saml_relay_states", foreignKey: "sso_provider_id"});
  sso_domains.belongsTo(sso_providers, { as: "sso_provider", foreignKey: "sso_provider_id"});
  sso_providers.hasMany(sso_domains, { as: "sso_domains", foreignKey: "sso_provider_id"});
  identities.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(identities, { as: "identities", foreignKey: "user_id"});
  mfa_factors.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(mfa_factors, { as: "mfa_factors", foreignKey: "user_id"});
  one_time_tokens.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(one_time_tokens, { as: "one_time_tokens", foreignKey: "user_id"});
  sessions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(sessions, { as: "sessions", foreignKey: "user_id"});
  clientexbitacora.belongsTo(bitacora, { as: "bitacora", foreignKey: "bitacora_id"});
  bitacora.hasMany(clientexbitacora, { as: "clientexbitacoras", foreignKey: "bitacora_id"});
  academicoxcliente.belongsTo(cliente_servicio, { as: "cliente_servicio", foreignKey: "cliente_servicio_id"});
  cliente_servicio.hasMany(academicoxcliente, { as: "academicoxclientes", foreignKey: "cliente_servicio_id"});
  clientexbitacora.belongsTo(cliente_servicio, { as: "cliente_servicio", foreignKey: "cliente_servicio_id"});
  cliente_servicio.hasMany(clientexbitacora, { as: "clientexbitacoras", foreignKey: "cliente_servicio_id"});
  contacto.belongsTo(cliente_servicio, { as: "cliente_servicio", foreignKey: "cliente_servicio_id"});
  cliente_servicio.hasMany(contacto, { as: "contactos", foreignKey: "cliente_servicio_id"});
  drogaxcliente.belongsTo(cliente_servicio, { as: "cliente_servicio", foreignKey: "cliente_servicio_id"});
  cliente_servicio.hasMany(drogaxcliente, { as: "drogaxclientes", foreignKey: "cliente_servicio_id"});
  info3meses.belongsTo(cliente_servicio, { as: "cliente_servicio", foreignKey: "cliente_servicio_id"});
  cliente_servicio.hasMany(info3meses, { as: "info3meses", foreignKey: "cliente_servicio_id"});
  informacion_inamu.belongsTo(cliente_servicio, { as: "cliente_servicio", foreignKey: "cliente_servicio_id"});
  cliente_servicio.hasMany(informacion_inamu, { as: "informacion_inamus", foreignKey: "cliente_servicio_id"});
  pensionxcliente.belongsTo(cliente_servicio, { as: "cliente_servicio", foreignKey: "cliente_servicio_id"});
  cliente_servicio.hasMany(pensionxcliente, { as: "pensionxclientes", foreignKey: "cliente_servicio_id"});
  razon_serxcliente.belongsTo(cliente_servicio, { as: "cliente_servicio", foreignKey: "cliente_servicio_id"});
  cliente_servicio.hasMany(razon_serxcliente, { as: "razon_serxclientes", foreignKey: "cliente_servicio_id"});
  cliente_servicio.belongsTo(donde_dormi, { as: "donde_dormi", foreignKey: "donde_dormi_id"});
  donde_dormi.hasMany(cliente_servicio, { as: "cliente_servicios", foreignKey: "donde_dormi_id"});
  drogaxcliente.belongsTo(droga, { as: "droga", foreignKey: "droga_id"});
  droga.hasMany(drogaxcliente, { as: "drogaxclientes", foreignKey: "droga_id"});
  cliente_servicio.belongsTo(estado_civil, { as: "estado_civil", foreignKey: "estado_civil_id"});
  estado_civil.hasMany(cliente_servicio, { as: "cliente_servicios", foreignKey: "estado_civil_id"});
  cliente_servicio.belongsTo(genero, { as: "genero", foreignKey: "genero_id"});
  genero.hasMany(cliente_servicio, { as: "cliente_servicios", foreignKey: "genero_id"});
  academicoxcliente.belongsTo(grado_academico, { as: "grado_academico", foreignKey: "grado_academico_id"});
  grado_academico.hasMany(academicoxcliente, { as: "academicoxclientes", foreignKey: "grado_academico_id"});
  ayudaxinamu.belongsTo(informacion_inamu, { as: "informacion_inamu", foreignKey: "informacion_inamu_id"});
  informacion_inamu.hasMany(ayudaxinamu, { as: "ayudaxinamus", foreignKey: "informacion_inamu_id"});
  instituxviolen.belongsTo(informacion_inamu, { as: "informacion_inamu", foreignKey: "informacion_inamu_id"});
  informacion_inamu.hasMany(instituxviolen, { as: "instituxviolens", foreignKey: "informacion_inamu_id"});
  violenciaxinamu.belongsTo(informacion_inamu, { as: "informacion_inamu", foreignKey: "informacion_inamu_id"});
  informacion_inamu.hasMany(violenciaxinamu, { as: "violenciaxinamus", foreignKey: "informacion_inamu_id"});
  instituxviolen.belongsTo(instituciones_violencia, { as: "instituciones_violencium", foreignKey: "instituciones_violencia_id"});
  instituciones_violencia.hasMany(instituxviolen, { as: "instituxviolens", foreignKey: "instituciones_violencia_id"});
  cliente_servicio.belongsTo(pais, { as: "pai", foreignKey: "pais_id"});
  pais.hasMany(cliente_servicio, { as: "cliente_servicios", foreignKey: "pais_id"});
  canton.belongsTo(provincia, { as: "provincium", foreignKey: "provincia_id"});
  provincia.hasMany(canton, { as: "cantons", foreignKey: "provincia_id"});
  cliente_servicio.belongsTo(provincia, { as: "provincium", foreignKey: "provincia_id"});
  provincia.hasMany(cliente_servicio, { as: "cliente_servicios", foreignKey: "provincia_id"});
  razon_serxcliente.belongsTo(razon_servicio, { as: "razon_servicio", foreignKey: "razon_servicio_id"});
  razon_servicio.hasMany(razon_serxcliente, { as: "razon_serxclientes", foreignKey: "razon_servicio_id"});
  cliente_servicio.belongsTo(tiempo_calle, { as: "tiempo_calle", foreignKey: "tiempo_calle_id"});
  tiempo_calle.hasMany(cliente_servicio, { as: "cliente_servicios", foreignKey: "tiempo_calle_id"});
  cliente_servicio.belongsTo(tipo_id, { as: "tipo_id", foreignKey: "tipo_id_id"});
  tipo_id.hasMany(cliente_servicio, { as: "cliente_servicios", foreignKey: "tipo_id_id"});
  pensionxcliente.belongsTo(tipo_pension, { as: "tipo_pension", foreignKey: "tipo_pension_id"});
  tipo_pension.hasMany(pensionxcliente, { as: "pensionxclientes", foreignKey: "tipo_pension_id"});
  violenciaxinamu.belongsTo(tipo_violencia, { as: "tipo_violencium", foreignKey: "tipo_violencia_id"});
  tipo_violencia.hasMany(violenciaxinamu, { as: "violenciaxinamus", foreignKey: "tipo_violencia_id"});
  ayudaxinamu.belongsTo(tipos_ayuda, { as: "tipos_ayuda", foreignKey: "tipos_ayuda_id"});
  tipos_ayuda.hasMany(ayudaxinamu, { as: "ayudaxinamus", foreignKey: "tipos_ayuda_id"});
  objects.belongsTo(buckets, { as: "bucket", foreignKey: "bucket_id"});
  buckets.hasMany(objects, { as: "objects", foreignKey: "bucket_id"});
  s3_multipart_uploads.belongsTo(buckets, { as: "bucket", foreignKey: "bucket_id"});
  buckets.hasMany(s3_multipart_uploads, { as: "s3_multipart_uploads", foreignKey: "bucket_id"});
  s3_multipart_uploads_parts.belongsTo(buckets, { as: "bucket", foreignKey: "bucket_id"});
  buckets.hasMany(s3_multipart_uploads_parts, { as: "s3_multipart_uploads_parts", foreignKey: "bucket_id"});
  s3_multipart_uploads_parts.belongsTo(s3_multipart_uploads, { as: "upload", foreignKey: "upload_id"});
  s3_multipart_uploads.hasMany(s3_multipart_uploads_parts, { as: "s3_multipart_uploads_parts", foreignKey: "upload_id"});

  return {
    academicoxcliente,
    audit_log_entries,
    ayudaxinamu,
    bitacora,
    buckets,
    canton,
    cliente_servicio,
    clientexbitacora,
    contacto,
    donde_dormi,
    droga,
    drogaxcliente,
    estado_civil,
    flow_state,
    genero,
    grado_academico,
    identities,
    info3meses,
    informacion_inamu,
    instances,
    instituciones_violencia,
    instituxviolen,
    key,
    messages,
    mfa_amr_claims,
    mfa_challenges,
    mfa_factors,
    migrations,
    objects,
    one_time_tokens,
    pais,
    pensionxcliente,
    provincia,
    razon_servicio,
    razon_serxcliente,
    refresh_tokens,
    s3_multipart_uploads,
    s3_multipart_uploads_parts,
    saml_providers,
    saml_relay_states,
    schema_migrations,
    schema_migrations,
    secrets,
    sessions,
    sso_domains,
    sso_providers,
    subscription,
    tiempo_calle,
    tipo_id,
    tipo_pension,
    tipo_violencia,
    tipos_ayuda,
    users,
    usuario_sistema,
    violenciaxinamu,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
